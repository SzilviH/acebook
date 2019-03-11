describe('adding a post', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:7000/feed');
  });

  it("asks users for a post", async () => {
    await expect(page).toMatch("What's on your mind");
  });
  it('users can add posts ', async () => {
    await expect(page).toFillForm('form[name="addPost"]', {
      content: 'My first post'
    });

    await page.click('#submit');
    await expect(page).toMatch("My first post")
  });
});
