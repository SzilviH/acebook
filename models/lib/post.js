const connection = require("../../database/connection");

class Post {
  constructor(id, message){
    this.id = id
    this.message = message
  }
  // static saveToDB = (content) => {
  //   connection.execute_query(`INSERT INTO POSTS (message) VALUES (${content})`)
  // }
}


module.exports = Post;
