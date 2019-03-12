const connection = require("../database/connection");

describe('liking a post', () => {

    beforeEach(async () => {
        await page.goto('http://localhost:5000/feed');
        await connection.pool.query("TRUNCATE TABLE posts RESTART IDENTITY");
    });

    it("shows the like on post", async () => {
        await page.type("#postContent", "message goes here");
        await page.click('#submit');
        await page.evaluate(() => {
            document.querySelector('#like-button-1').click();
        });

        await expect(page).toMatch("1 like");
    });



});