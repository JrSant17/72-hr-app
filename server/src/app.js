const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const knex = require('knex')(require('../knexfile.js')["development"]);

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Application up and running.');
});

app.listen(port, () => {
    console.log('Your Knex and Express application are running successfully.');
});

//get all inventory - test - and for visitor page
app.get('/inventory', (req, res) => {
    knex('item')
        .select('*')
        .then(data => {
            var allData = data.map(item => item);
            res.json(allData);
        });
});

//get all users - test
app.get('/users', (req, res) => {
    knex('user')
        .select('*')
        .then(data => {
            var allUsers = data.map(user => user);
            res.json(allUsers);
        });
});

//post new account
app.post('/createUser', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    try {
        if (!first_name || !last_name || !username || !password) {
            return res.json({
                accountCreated: false,
            });
        }

        //fixes unique key constraint - duplicate user primary key
        const maxIdResult = await knex('user').max('id as max_id').first();
        const maxId = maxIdResult.max_id || 0;

        await knex.raw(`
            SELECT setval('public.user_id_seq', ?, false);`, [maxId + 1]);

        await knex('user')
            .insert({
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: password,
            });

        res.json({ accountCreated: true });
        
    } catch (err) {
        console.error(err);
        res.json({accountCreated: false});
    }
});

//login with existing user
app.post("/existingUser", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.json("Username and password are required.");
        }

        const user = await knex("user")
            .select("password", "id", "username")
            .where({ username })
            .first();

        if (!user) {
            return res.json({ message: "User not found." });
        }

        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
            return res.json({ message: "Invalid password." });
        }

        res.json({
            message: "Login successful.",
            userId: user.id,
            username: user.username
        });
    } catch (error) {
        console.error(error);
        res.json({ message: "An error occurred during login." });
    }
});

//get only user inventory by user id
app.get("/inventory/:userId", (req, res) => {
    const { userId } = req.params;

    if (!userId || isNaN(userId)) {
        return res.json({ message: "Invalid user ID." });
    }

    knex("item")
        .select('id', 'user_id', 'item_name', 'description', 'quantity')
        .where("user_id", userId)
        .then((inventory) => {
            const inventoryWithTruncatedDescriptions = inventory.map(item => ({
                ...item,
                description: item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description
            }));

            return res.json({ inventory: inventoryWithTruncatedDescriptions || [] });
        })
        .catch((err) => {
            console.error(err);
            return res.json({ message: "Error fetching inventory" });
        });
});

//add new inventory item
app.post('/inventory/:userId', async (req, res) => {
    const { userId } = req.params;
    const { item_name, description, quantity } = req.body;

    try {

        //fixes unique key constraint - duplicate item primary key
        const maxIdResult = await knex('item').max('id as max_id').first();
        const maxId = maxIdResult.max_id || 0;

        await knex.raw(`
            SELECT setval('public.item_id_seq', ?, false);
        `, [maxId + 1]);

        const [newItem] = await knex('item')
            .insert({ user_id: userId, item_name, description, quantity })
            .returning('*');

        res.json({ newItem });
    } catch (err) {
        console.error(err);
        res.json('Error adding inventory');
    }
});

//edit inventory item - fix bugs
app.put('/inventory/:userId/:itemId', (req, res) => {
    const { userId, itemId } = req.params;
    const { item_name, description, quantity } = req.body;

    knex('item')
        .where('id', itemId)
        .andWhere('user_id', userId)
        .update({ item_name, description, quantity })
        .returning('*')
        .then(([updatedItem]) => {
            res.json({ updatedItem });
        })
        .catch((err) => {
            console.error(err);
        });
});

//delete inventory item
app.delete('/inventory/:userId/:itemId', (req, res) => {
    const { userId, itemId } = req.params;

    // debug delete issue
    // console.log("Attempting to delete item:", { userId, itemId });


    knex('item')
        .where('id', itemId)
        .andWhere('user_id', userId)
        .del()
        .then(() => {
            res.json('Item deleted');
        })
        .catch((err) => {
        res.json('Error deleting item');
        });
});

//get inventory item details
app.get('/inventory/item/:itemId', (req, res) => {
    const { itemId } = req.params;

    knex('item')
        .where( 'id', itemId )
        .first()
        .then(item => {
            if (!item) {
                return res.status(404).json(err);
            }
            res.json({ item });
        })
        .catch((error) => {
            console.error(error);
        });
});