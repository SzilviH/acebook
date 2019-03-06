const connection = require("../../database/connection");


class Post {
  constructor(id, message){
    this.id = id
    this.message = message
  }
  static async saveToDB(content) {
   await connection.pool.query(`INSERT INTO posts (message) VALUES ('${content}')`);
   return ("done")
  }
}


module.exports = Post;
