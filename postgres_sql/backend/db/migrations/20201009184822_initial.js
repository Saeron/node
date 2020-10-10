const Knex = require("knex");
const knex = require("knex");
const tableNames = require("../../src/constants/tableNames");

function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.datetime('deleted_at');
}

function createNameTable(knex, table_name) {
    return knex.schema.createTable(table_name, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable().unique();
        addDefaultColumns(table);
    });
}

/**
 * @param {knex} knex 
 */
exports.up = async (knex) => {
    await knex.schema.createTable(tableNames.user, (table) => {
        table.increments().notNullable();
        table.string('email', 254).notNullable().unique();
        table.string('name').notNullable();
        table.string('password', 127).notNullable();
        table.datetime('last_login');
        addDefaultColumns(table);
    });
    await createNameTable(knex, tableNames.item_type);
    await createNameTable(knex, tableNames.country);
    await createNameTable(knex, tableNames.state);
    await createNameTable(knex, tableNames.shape);
    await knex.schema.createTable(tableNames.location, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
        table.string('description', 1000);
        table.string('image_url', 2000);
        addDefaultColumns(table);
    });
    await knex.schema.createTable(tableNames.address, (table) => {
        table.increments().notNullable();
        table.string('street_address_1').notNullable();
        table.string('street_address_2');
        table.integer('state_id').unsigned().references('id').inTable('state');
        });

};

exports.down = async (knex) => {
    await knex.schema.dropTable(tableNames.user);
    await Promise.all([
        tableNames.user,
        tableNames.item_type,
        tableNames.location,
        tableNames.shape,
        tableNames.state,
        tableNames.state
    ].map((tableName => knex.schema.dropTable(tableName))));
};
