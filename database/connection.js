const Pool = require("pg").Pool;
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.DATABASE_URL)
const pool = new Pool({
    // user: "",
    // host: "localhost",
    // database: "acebook",
    // password: "",
    // port: 5432
    connectionString: process.env.DATABASE_URL ,
    // ssl: true
});

// exports.execute_query = async function (query) {
//
//     // pool.query(query, (error, results) => {
//     //     if (error) {
//     //         throw error
//     //     }
//     //     return results
//     //     // console.log(results)
//     //     // return JSON.parse(results.rows)
//     // });
//
//     pool.query(query)
//   .then((res) => console.log(res.rows[0])) // brianc
//   .catch(err => console.error('Error executing query', err.stack))
// }

module.exports.pool = pool
