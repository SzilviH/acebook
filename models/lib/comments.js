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
        await connection.pool.query(`INSERT INTO comments (content, author, postId) VALUES ('${content}', '${user}', '${postId}')`);
    };

    static async getComments() {
        let allCommentsArray = [];
        let allComments = await connection.pool.query("SELECT id, content, postid, author, date FROM comments ORDER BY date DESC");
        allComments.rows.forEach((element) => {
            element.date = element.date.toString().substring(0, 24);
            allCommentsArray.push(new Comment(element.id, element.content, element.author, element.postid, element.date))
        });
        return allCommentsArray;
    }
}

module.exports = Comment;
