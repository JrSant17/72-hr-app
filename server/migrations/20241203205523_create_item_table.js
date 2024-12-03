/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('item', table => {
        table.increments('id');
        table.integer('UserId');
        table.string('Item Name');
        table.string('Description');
        table.integer('Quantity');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('item');
};
