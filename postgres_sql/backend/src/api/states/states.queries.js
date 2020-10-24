const db = require('../../db');
const tableNames = require('../../constants/tableNames');


module.exports = {
    find() {
        return db(tableNames.state).select('id', 'name');
    },
    get(id) {
        const state = db(tableNames.state)
            .select('id', 'name')
            .where({
                id,
            }).first();
        return state;
    }
};