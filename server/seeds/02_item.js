/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex.schema.raw('TRUNCATE item CASCADE')
  await knex('item').del()
  await knex('item').insert([
    {id: 1, user_id: '1', item_name: 'End Cryptographic Unit', description: 'Cryptographic unit to encrypt and decrypt satellite links' , quantity: 23},
    {id: 2, user_id: '1', item_name: 'Electric Power System', description: 'An electric power system is a network of electrical components deployed to supply, transfer, and use electric power' , quantity: 4},
    {id: 3, user_id: '2', item_name: 'Antenna', description: 'a device that transmits and receives signals to and from satellites in orbit around the Earth.' , quantity: 15},
    {id: 4, user_id: '2', item_name: 'Solar Panel', description: 'transform sunlight into electrical power for the operation of a satellite' , quantity: 86},
  ]);
};
