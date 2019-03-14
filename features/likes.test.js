const connection = require("../database/connection");

const sleep = require('sleep');

describe('liking a post', () => {
    beforeAll(async () => {
        await sleep.sleep(1)
        await page.goto('http://localhost:5000/');
        await page.evaluate(() => {
          localStorage.setItem("username","User");
          });
        await page.goto('http://localhost:5000/feed');
        await connection.pool.query("TRUNCATE TABLE posts, comments, likes RESTART IDENTITY")
    });

    it("shows the like on post", async () => {
        await page.type("#postContent", "message goes here");
        await page.click('#submit');
        await page.waitForSelector("#like-1");
        await Promise.all([
          page.evaluate(() => {
              document.querySelector('#like-1').click()
          }),
        ]);
        await expect(page).toMatch("1 like");
    });

    it("shows second like on post", async () => {
         await page.evaluate(() => {
              document.querySelector('#like-1').click()
          });
        await expect(page).toMatch("2 likes");
    });

});
