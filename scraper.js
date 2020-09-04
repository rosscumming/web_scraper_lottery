const puppeteer = require("puppeteer");

let LottoScraper = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const URL = "https://www.national-lottery.co.uk/results/lotto/draw-history";
  const home = "https://www.national-lottery.co.uk/games/lotto";
  await page.goto(URL, { waitUntil: "load" });

  const [drawElement] = await page.$x(
    '//*[@id="draw_history_lotto"]/ul/li[2]/ul/li[1]/div/span'
  );
  const drawText = drawElement.getProperty("innerText");
  const draw = await (await drawText).jsonValue();

  const [jackpotElement] = await page.$x(
    '//*[@id="draw_history_lotto"]/ul/li[2]/ul/li[2]/div/span'
  );
  const jackpotText = jackpotElement.getProperty("innerText");
  const jackpot = await (await jackpotText).jsonValue();

  const [numbersElement] = await page.$x(
    '//*[@id="draw_history_lotto"]/ul/li[2]/ul/li[3]/div/span'
  );
  const numbersText = numbersElement.getProperty("innerText");
  const numbers = await (await numbersText).jsonValue();

  const [bonusBallElement] = await page.$x(
    '//*[@id="draw_history_lotto"]/ul/li[2]/ul/li[4]/div/span'
  );
  const bonusBallText = bonusBallElement.getProperty("innerText");
  const bonusBall = await (await bonusBallText).jsonValue();

  const acceptCookies = await page.$x(
    '//*[@id="cuk_cookie_consent_content_inner"]/div[3]/div/div/div/div/div[3]/a[1]'
  );

  await page.waitFor(2000);

  for (const accept of acceptCookies) {
    await accept.click();
  }

  const prizeLink = await page.$x('//*[@id="prize_breakdown_51319"]');

  for (const href of prizeLink) {
    await href.click();
  }

  await page.waitFor(2000);

  const [winnersLinkElement] = await page.$x('//*[@id="winners_count_0"]/div');
  const winnersHref = winnersLinkElement.getProperty("innerText");
  const winners = await (await winnersHref).jsonValue();

  await page.waitFor(1000);

  await page.goto(home);

  const [nextDrawAmountElement] = await page.$x(
    '//*[@id="nextdrawpromo"]/h2/span[2]/span[1]'
  );
  const nextDrawAmountText = nextDrawAmountElement.getProperty("innerText");
  const nextDrawAmountAmount = await (await nextDrawAmountText).jsonValue();

  await browser.close();

  console.log({ draw, jackpot, numbers, bonusBall, winners });
  console.log("NEXT DRAW JACKPOT:", nextDrawAmountAmount);

  return { draw, jackpot, numbers, bonusBall, winners };
};

LottoScraper();
