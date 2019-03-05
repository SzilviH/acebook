const connection = require("../../database/connection");




class Post {
  constructor(id, message){
    this.id = id
    this.message = message
  }
  static saveToDB(content) {
    connection.pool.query(`INSERT INTO posts (message) VALUES ('${content}')`);
  }
}


module.exports = Post;
