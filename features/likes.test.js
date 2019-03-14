// const connection = require("../database/connection");
// const sleep = require('sleep');
//
// describe('liking a post', () => {
//     beforeEach(async () => {
//         await sleep.sleep(1)
//         await page.goto('http://localhost:5000/');
//         await page.evaluate(() => {
//           localStorage.setItem("username","User");
//           });
//         await page.goto('http://localhost:5000/feed');
//         await connection.pool.query("TRUNCATE TABLE posts, comments, likes RESTART IDENTITY")
//     });
//
//     it("shows the like on post", async () => {
//         await page.screenshot({path: "newscren.png"})
//         await page.type("#postContent", "message goes here");
//         await page.click('#submit');
//         await page.screenshot({path: 'screenshot.png'})
//         await Promise.all([
//           page.evaluate(() => {
//               document.querySelector('#like-1').click()
//           }),
//           page.waitForNavigation({'waitUntil': 'networkidle0'})
//         ]);
//         await page.evaluate(() => {
//           localStorage.setItem("username","User");
//           });
//           page.waitForNavigation({'waitUntil': 'networkidle0'})
//
//         await page.screenshot({path: 'screenshot2.png'})
//         await expect(page).toMatch("1 like");
//     });
//
// });
