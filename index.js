require("dotenv").config();

const puppeteer = require("puppeteer");
const { loginUrl, billingUrl } = require("./src/vars");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1366, height: 768 });
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
  await page.waitForSelector(".invoice-title");
  const first = await page.$$(".invoice-title");
  await page.screenshot({ path: "test.png" });

  await browser.close();
})();
