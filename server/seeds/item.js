/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, UserId: '526', 'Item Name': 'End Cryptographic Unit', Description: 'Cryptographic unit to encrypt and decrypt satellite links' , Quantity: 23},
    {id: 2, UserId: '245', 'Item Name': 'Electric Power System', Description: 'An electric power system is a network of electrical components deployed to supply, transfer, and use electric power' , Quantity: 4},

  ]);
};
