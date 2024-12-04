const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const knex = require('knex')(require('../knexfile.js')["development"])

app.use(cors());

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

app.get('/user', (req, res) => {
    knex('user')
        .select('*')
        .then(data => {
            var allUsers = data.map(user => user)
            res.json(allUsers);
        })
})