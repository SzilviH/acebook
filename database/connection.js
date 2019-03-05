const Pool = require("pg").Pool;
const pool = new Pool({
    user: "",
    host: "localhost",
    database: "acebook",
    password: "",
    port: 5432
});

exports.execute_query = function (query) {

    // pool.query(query, (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     return results
    //
    // });

    pool.query('SELECT * from posts')
  .then((res) => console.log(res.rows[0])) // brianc
  .catch(err => console.error('Error executing query', err.stack))
}
