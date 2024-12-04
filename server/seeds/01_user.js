/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE TABLE "user" CASCADE')
  await knex('user').del()
  await knex('user').insert([
    {id: 1, first_name: 'John', last_name: 'Doe', username: 'DoeJohn631', password: 'JohnPass',},
    {id: 2, first_name: 'Jane', last_name: 'Doe', username: 'Doejane5412', password: 'JanePass',}
    ]);
};
