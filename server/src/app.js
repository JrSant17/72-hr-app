const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const knex = require('knex')(require('../knexfile.js')["development"])

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Application up and running.')
})

app.listen(port, () => {
    console.log('Your Knex and Express application are running successfully.')
})

//gets all inventory data to verify
app.get('/inventory', (req, res) => {
    knex('item')
        .select('*')
        .then(data => {
            var allData = data.map(item => item)
            res.json(allData);
        })
})

//gets user data to verify
app.get('/users', (req, res) => {
    knex('user')
        .select('*')
        .then(data => {
            var allUsers = data.map(user => user)
            res.json(allUsers);
        })
})

app.post('/createUser', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    try {

        if (!first_name || !last_name || !username || !password) {
            return res.status(400).json({
                accountCreated: false,
                message: "All fields are required.",
            });
        }

        const maxIdResult = await knex('user').max('id as max_id').first();
        const maxId = maxIdResult.max_id || 0;

        await knex.raw(`
            SELECT setval('public.user_id_seq', ?, false);
        `, [maxId + 1]);

        await knex('user')
            .insert({
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: password,
            })

        res.status(201).json({ accountCreated: true });
    } catch (err) {
        console.error("Error creating account:", err);
        res.status(500).json({
            accountCreated: false,
            message: err.message || "An error occurred while creating the account.",
        });
    }
});

app.post("/existingUser", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const user = await knex("user")
            .select("password", "id", "username")
            .where({ username })
            .first();

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        res.status(200).json({
            message: "Login successful.",
            userId: user.id,
            username: user.username
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
});

app.get("/inventory/:userId", (req, res) => {
    const { userId } = req.params;

    knex("item")
        .select('user_id', 'item_name', 'description', 'quantity')
        .where("user_id", userId)
        .then((inventory) => {
            if (inventory.length === 0) {
                return res.status(404).json({ message: "No inventory found for this user." });
            }
            return res.json({ inventory });
        })
        .catch((err) => {
            console.error("Error fetching inventory:", err);
            return res.status(500).json({ message: "Error fetching inventory" });
        });
});


app.post('/inventory/:userId', async (req, res) => {
    const { userId } = req.params;
    const { item_name, description, quantity } = req.body;

    try {
        
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
        console.error('Error adding inventory:', err);
        res.status(500).send('Error adding inventory');
    }
});