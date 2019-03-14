const sleep = require('sleep');
const connection = require("../database/connection");
describe('comments ', () => {

    beforeAll(async () => {
        await sleep.sleep(1);
        await connection.pool.query("TRUNCATE TABLE posts, comments, likes RESTART IDENTITY");
        await page.goto('http://localhost:5000/');
        await page.evaluate(() => {
            localStorage.setItem("username", "User");
        });
        await page.goto('http://localhost:5000/feed');
    });

    it("should have a comment option", async () => {
        await expect(page).toFillForm('form[name="addPost"]', {
            content: 'Post for a comment'
        });
        await page.click('#submit');
        await page.waitForSelector("#commentContent-1");
        await expect(page).toFillForm('form[name="addComment"]', {
            comment: 'Long comment'
        });
        await page.click('#comment-1');
        await expect(page).toMatch('Long comment')
    });

});

