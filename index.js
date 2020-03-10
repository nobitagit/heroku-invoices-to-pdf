require("dotenv").config();

const puppeteer = require("puppeteer");
const { loginUrl, billingUrl } = require("./src/vars");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1300, height: 790 });
  await page.goto(loginUrl);

  // Fill in the login details
  await page.$eval(
    "#email",
    (el, env) => (el.value = env.USER_NAME),
    // we need to pass the env as arg to have it available in the callback context,
    // see https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pageevalselector-pagefunction-args-1
    // and check ...args
    process.env
  );
  await page.$eval(
    "#password",
    (el, env) => (el.value = env.USER_PASSWORD),
    process.env
  );
  await page.waitForSelector('button[name="commit"]');
  await page.click('button[name="commit"]');

  await page.goto(billingUrl, { waitUntil: "networkidle2" });

  // Once we get to the list of invoices click on the first and load the page
  await page.waitForSelector(".invoice-title");
  const input = await page.$$(".invoice-title input[type='submit']");
  input[0].click();

  await page.waitForSelector(".invoice-period");

  await page.screenshot({ path: "test.png" });

  // await browser.close();
})();
