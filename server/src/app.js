const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const knex = require('knex')(require('../knexfile.js')["development"])

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Application up and running.')
})

app.listen(port, () => {
    console.log('Your Knex and Express application are running successfully.')
})

//gets all data
app.get('/inventory', (req, res) => {
    knex('item')
        .select('*')
        .then(data => {
            var allData = data.map(item => item)
            res.json(allData);
        })
})

//gets user data
app.get('/users', (req, res) => {
    knex('user')
        .select('*')
        .then(data => {
            var allUsers = data.map(user => user)
            res.json(allUsers);
        })
})

app.post('/users', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    try {
        // Ensure all fields are provided
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

