const Post = require("../lib/post.js");
// const DatabaseCleaner = require('database-cleaner');
// dbcleaner = new DatabaseCleaner('postgresql')
const savePost = require("../lib/post").savePost
const connection = require("../../database/connection")

// beforeEach(() => {
//   connection.pool.query("TRUNCATE TABLE posts")
// });

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

//test works properly only on a second run
describe('saving posts', async () => {
  it("saves post to databse", async () => {
    await Post.saveToDB("something different");
    await connection.pool.query("SELECT * FROM posts ORDER BY id DESC LIMIT 1")
   .then((res) => expect(res.rows[0].message).toEqual('something else'));
  });
  });
