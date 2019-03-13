signin = require("../views/loginInterface")

puppeteer = require('puppeteer')
describe('Incognito mode:', () => {

  beforeEach(async () => {
    const browser = await puppeteer.launch()
    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage()
  });

  it("should be able to access home page", async () => {
    await page.goto('http://localhost:5000');
    await expect(page).toMatch("Please log in to access Acebook")
  });

  it("should not be able to access feed page without logging in", async () => {
    await page.goto('http://localhost:5000/feed');
    await page.waitForNavigation({'waitUntil': 'networkidle0'});
    const url = await page.evaluate(() => location.href);
    await expect(url).toBe('http://localhost:5000/')
    await expect(page).toMatch("Please log in to access Acebook")
  })

  // it('should have a google login button', async() => {
  //   await page.goto('http://localhost:5000');
  //   await expect(page).toContain("#googleLogIn")
  // });

  // it("should redirect to feed on successful log in", async () => {
  //   await page.goto('http://localhost:5000');
  //   await page.click('#googleLogIn');
  //   await signin.onSignIn()
  //   await page.screenshot({path: 'b2.png'})
  // })

});
