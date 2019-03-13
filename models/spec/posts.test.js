const Post = require("../lib/post.js");
const savePost = require("../lib/post").savePost
const connection = require("../../database/connection")

describe('creates an instance of post', () => {
  it("should have a message paramater", async() => {
    let post = new Post(1, "message");
    expect(post.message).toEqual("message");
  });

  it("should have an id", async () => {
    let post = new Post(2, "message");
    expect(post.id).toEqual(2);
  });
});

describe('saving posts',  () => {
    beforeEach(async () => {
        await connection.pool.query("TRUNCATE TABLE posts RESTART IDENTITY");
    });
  it("saves post to databse",  async () => {
    await Post.saveToDB("hello")
    let result = await connection.pool.query("SELECT * FROM posts ORDER BY id DESC LIMIT 1")
    expect(result.rows[0].message).toEqual('hello')
  });
  });

  describe('getting posts',  () => {
    beforeEach(async () => {
        await connection.pool.query("TRUNCATE TABLE posts RESTART IDENTITY");
    });
    it("gets all posts from db",  async () => {
      await Post.saveToDB("hello")
      await Post.saveToDB("second post")
      let result = await Post.getPosts()
      expect(result.length).toEqual(2);
    });
    it("returns an array of post objects", async () =>{
      await Post.saveToDB("hello")
      await Post.saveToDB("second post")
      let result = await Post.getPosts()
      expect(result[0] instanceof Post).toEqual(true);
    })

  });
