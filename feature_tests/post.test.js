describe('Post functionality', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000/');
  });

  it('should be titled "Google"', async () => {
    await expect(page).toMatch('just testing');
  });
});
