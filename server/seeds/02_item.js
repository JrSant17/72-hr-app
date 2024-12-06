const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex.schema.raw('TRUNCATE item CASCADE')
  await knex('item').del()
  // await knex('item').insert([
  //   {id: 1, user_id: '1', item_name: 'End Cryptographic Unit', description: 'Cryptographic unit to encrypt and decrypt satellite links' , quantity: 23},
  //   {id: 2, user_id: '1', item_name: 'Electric Power System', description: 'An electric power system is a network of electrical components deployed to supply, transfer, and use electric power' , quantity: 4},
  //   {id: 3, user_id: '2', item_name: 'Antenna', description: 'a device that transmits and receives signals to and from satellites in orbit around the Earth.' , quantity: 15},
  //   {id: 4, user_id: '2', item_name: 'Solar Panel', description: 'transform sunlight into electrical power for the operation of a satellite' , quantity: 86},
  // ]);
  const users = await knex('user').select('id');

  if (!users.length) {
    console.error("No users found in 'users' table. Cannot seed 'item' table.");
    return;
  }
  
  const fakeData = (users, entries) => {
    const results = [];

    for (let i = 0; i < entries; i++) {
      results.push({
        user_id: faker.helpers.arrayElement(users.map(user => user.id).filter(id => id >= 1 && id <= 50)),
        item_name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        quantity: faker.number.int({ min: 1, max: 50 }),
      });
    }
    return results;
  };
  const items = fakeData(users, 50);
  if (!items.length) {
    console.error("No items were generated. Exiting seeder.");
    return;
  }

  await knex('item').insert(items);
  console.log("Seeded 'item' table with 50 entries.");
};
