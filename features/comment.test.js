const sleep = require('sleep')
describe('comments ', () => {

    beforeAll(async () => {
        await sleep.sleep(1)
        await page.goto('http://localhost:5000/');
        await page.evaluate(() => {
            localStorage.setItem("username", "User");
        });
        await page.goto('http://localhost:5000/feed');
        await expect(page).toFillForm('form[name="addPost"]', {
            content: 'My first post'
        });
        await page.click('#submit');
    });

    it("should have a comment option", async () => {
        await page.screenshot({path: "comment.png"});
        await expect(page).toFillForm('form[name="addComment"]', {
            comment: 'Long comment'
        });
        await page.click('#comment-1');
        await expect(page).toMatch('Long comment')
    });

});

