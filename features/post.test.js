describe('Logged In ', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:5000/');
    await page.evaluate(() => {
      localStorage.setItem("username","User");
      });
    await page.goto('http://localhost:5000/feed');
  });

  describe('adding a post', () => {
    it("asks users for a post", async () => {
      await expect(page).toMatch("What's on your mind?");
    });
    it('users can add posts ', async () => {
      await expect(page).toFillForm('form[name="addPost"]', {
        content: 'My first post'
      });

      await page.click('#submit');
      await expect(page).toMatch('My first post')
    });
  });

  describe('adding a comment', () => {

    beforeAll(async () => {
      await expect(page).toFillForm('form[name="addPost"]', {
        content: 'My first post'
      });
      await page.click('#submit');
    })

    it("should have a comment option", async () => {
      await expect(page).toMatch('Comment')
    });

    it("should have a comment option", async () => {
      await expect(page).toFillForm('form[name="addComment"]', {
        comment: 'Long comment'
      });
      await page.click('.comment');
      await expect(page).toMatch('Long comment')
    });
  });
});
