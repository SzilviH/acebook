describe('adding a post', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000/feed');
  });

  it("users can add a post", async () => {
    await expect(page).toMatch("What's on your mind");
    await expect(page).toFillForm('form[name="addPost"]', {
      content: 'My first post'
    });
    // await page.click('#submit')
    // await expect(page).toMatch("My first post")
  });
});
