const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const URL = "https://www.national-lottery.co.uk/results/lotto/draw-history";
  await page.goto(URL);

  const getDrawDate = await page.evaluate(() => {
    let draw = document.querySelectorAll(
      "#draw_history_lotto > ul > li:nth-child(2) > ul > li.table_cell.table_cell_1.table_cell_1_width_no_raffle.table_cell_first > div > span"
    );

    let drawDate = [...draw];
    return drawDate.map((e) => e.innerText);
  });

  const getJackpot = await page.evaluate(() => {
    let jackpot = document.querySelectorAll(
      "#draw_history_lotto > ul > li:nth-child(2) > ul > li.table_cell.table_cell_2.table_cell_2_width_no_raffle > div > span"
    );

    let jackpotAmount = [...jackpot];
    return jackpotAmount.map((e) => e.innerText);
  });

  const getNumbers = await page.evaluate(() => {
    let numbers = document.querySelectorAll(
      "#draw_history_lotto > ul > li:nth-child(2) > ul > li.table_cell.table_cell_3.table_cell_3_width_no_raffle > div > span"
    );

    let drawNumbers = [...numbers];
    return drawNumbers.map((e) => e.innerText);
  });

  const getBonus = await page.evaluate(() => {
    let bonus = document.querySelectorAll(
      "#draw_history_lotto > ul > li:nth-child(2) > ul > li.table_cell.table_cell_4.table_cell_4_width_no_raffle > div > span"
    );

    let bonusBall = [...bonus];
    return bonusBall.map((e) => e.innerText);
  });

  console.log(getDrawDate);
  console.log(getJackpot);
  console.log(getNumbers);
  console.log(getBonus);

  await browser.close();
})();
