/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, 'First Name': 'John', 'Last Name': 'Doe', Username: 'Doejohn@yahoo.com', Password: 'JohnPass',},
    {id: 2, 'First Name': 'Jane', 'Last Name': 'Doe', Username: 'Doejane@msn.com', Password: 'JanePass',}
    ]);
};
