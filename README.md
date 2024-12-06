# 72-hr-app

Generate database in docker or other similar database and replace connection details in the knex database with your own database connection details. Knex cannot create a database.

npx knex migrate:latest to migrate user and item tables
npx knex seed:run to generate seed files

Client side - cd into client folder, NPM start to run front end
    Dependencies:
        "vite"
        "react"
        "react-dom"
        "react-router-dom"

Server side - cd into server folder, NPM start to run back end
    Dependencies:   
        "cors"
        "express"
        "knex"
        "pg"
        "react-use-navigate"
        "@faker-js/faker"



If querying tables in postgres, be sure to include quotations around the word "user", since it is a privelaged word. If no quotations are used, it will not generate correct data.