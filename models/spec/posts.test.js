const Post = require("../lib/post.js");
// const DatabaseCleaner = require('database-cleaner');
// dbcleaner = new DatabaseCleaner('postgresql')
const savePost = require("../lib/post").savePost
const connection = require("../../database/connection")

beforeEach(() => {
  connection.pool.query("TRUNCATE TABLE posts")
});

describe('creates an instance of post', () => {
  it("should have a message paramater", async () => {
    await connection.pool.query("TRUNCATE TABLE posts")
    let post = new Post(1, "message");
    expect(post.message).toEqual("message");
  });
  it("should have an id", async () => {
    await connection.pool.query("TRUNCATE TABLE posts")
    let post = new Post(2, "message");
    expect(post.id).toEqual(2);
  });
});

describe('saving posts',  () => {
  it("saves post to databse",  async () => {
    await connection.pool.query("TRUNCATE TABLE posts")
    await Post.saveToDB("hello")
    let result = await connection.pool.query("SELECT * FROM posts ORDER BY id DESC LIMIT 1")
    expect(result.rows[0].message).toEqual('hello')
  });
  });

  describe('getting posts',  () => {
    it("gets all posts from db",  async () => {
      await connection.pool.query("TRUNCATE TABLE posts")
      await Post.saveToDB("hello")
      await Post.saveToDB("second post")
      let result = await Post.getPosts()
      expect(result.length).toEqual(2);
    });
    it("returns an array of post objects", async () =>{
      await connection.pool.query("TRUNCATE TABLE posts")
      await Post.saveToDB("hello")
      await Post.saveToDB("second post")
      let result = await Post.getPosts()
      expect(result[0] instanceof Post).toEqual(true); 
    })

  });
