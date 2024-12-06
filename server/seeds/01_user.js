const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE TABLE "user" CASCADE')
  await knex('user').del()
  // await knex('user').insert([
  //   {id: 1, first_name: 'John', last_name: 'Doe', username: 'DoeJohn631', password: 'JohnPass',},
  //   {id: 2, first_name: 'Jane', last_name: 'Doe', username: 'Doejane5412', password: 'JanePass',}
  //   ]);

  const fakeData = (entries) => {
    var results = [];

    for (let i = 0; i < entries; i++) {
      let user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        username: faker.internet.username(),
        password: faker.internet.password()

      };
      results.push(user);
    }
    return results;
  };
  await knex('user').insert(fakeData(50));
};
