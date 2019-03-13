const connection = require("../../database/connection");

class Comment {
    constructor(id, content, user, postId,date) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.postId = postId;
        this.date = date;
    };

    static async saveToDB(content, user, postId) {
        console.log("model");
        await connection.pool.query(`INSERT INTO comments (content, author, postId) VALUES ('${content}', '${user}', '${postId}')`);
    };
    //
    // static async getPosts() {
    //     let allPostsArray = [];
    //     let allPosts = await connection.pool.query("SELECT id, message, username, date FROM posts ORDER BY date DESC");
    //     allPosts.rows.forEach((element) => {
    //         element.date = element.date.toString().substring(0, 24);
    //         allPostsArray.push(new Post(element.id, element.message, element.username, element.date))
    //     });
    //     return allPostsArray;
    // }
}

module.exports = Comment;
