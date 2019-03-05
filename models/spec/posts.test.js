const Post = require("../lib/post.js");
// const savePost = require("../lib/post").savePost
connection = require("../../database/connection")

describe('creates an instance of post', () => {
  it("should have a message paramater", () => {
    let post = new Post(1, "message");
    expect(post.message).toEqual("message");
  });
  it("should have an id", () => {
    let post = new Post(2, "message");
    expect(post.id).toEqual(2);
  });
});

describe('saving posts', () => {
  it("saves post to databse", () => {
    Post.saveToDB("something else");
    connection.pool.query("SELECT * FROM posts ORDER BY id DESC LIMIT 1")
    .then((res) => expect(res.rows[0].message).toEqual('something else'));
});
