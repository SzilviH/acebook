const Pool = require("pg").Pool;
const pool = new Pool({
    user: "",
    host: "localhost",
    database: "acebook",
    password: "",
    port: 5432
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        // JSON.stringify(thing)
    })
}

module.exports = {
    getUsers
}
