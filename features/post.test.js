describe('adding a post', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:5000/feed');
  });

  it("asks users for a post", () => {
     expect(page).toMatch("What's on your mind?");
  });

  it('users can add posts ', async () => {
    await expect(page).toFillForm('form[name="addPost"]', {
      content: 'My first post'
    });

    await page.click('#submit');
    await expect(page).toMatch('My first post')
  });

  it("can handle special characters", async () => {
    await page.type("#postContent", "punctuation's $?%@!\"");
    await page.click('#submit');
    await expect(page).toMatch("punctuation's $?%@!\"")
  });

  it("can handle new lines", async () => {
      await page.type("#postContent", "first line");
      await page.screenshot({path: 'first-line.png'});
      await page.keyboard.press('Enter');
      await page.screenshot({path: 'second-line.png'});
      await page.type("#postContent", "second line");
      await page.screenshot({path: 'third-line.png'});
      await page.click('#submit');
      await page.screenshot({path: 'fourth-line.png'});
      await expect(page).toMatch("first line\nsecond line")
  });


  it("displays the time it was created", async () => {
    let now = await Date(Date.now()).toString().substring(1, 15);
    await expect(page).toMatch(now);
  });
});
//
