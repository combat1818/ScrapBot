const { firefox } = require('playwright');
/* '00005372', */
let codes = [];
let forbiddenCodes = [
  '00005316',
  '00005327',
  '00005338',
  '00005350',
  '00005361',
  '00005394',
  '00005383',
];

async function browse(s, i) {
  const browser = await firefox.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    'https://przegladarka-ekw.ms.gov.pl/eukw_prz/KsiegiWieczyste/wyszukiwanieKW'
  );
  for (let i = 10; i < codes.length; i++) {
    if (!forbiddenCodes.includes(codes[i])) {
      await page.fill('#kodWydzialuInput', 'GW1G');
      await page.fill('#numerKsiegiWieczystej', codes[i]);
      await page.fill('#cyfraKontrolna', '7');
      await page.click('button#wyszukaj');
      await page.waitForTimeout(400);
      //const stuff = await page.click('text=Nieprawidłowa cyfra kontrolna!');
      const data = await page.evaluate(() => {
        const images = document.querySelectorAll('.visible');
        const urls = Array.from(images).map((v) => v.id);
        console.log(urls);

        return urls;
      });
      if (data.length == 0) {
        console.log(s);
      }
    }
  }

  //console.log(data);
  //await page.fill('#cyfraKontrolna--cyfra-kontrolna', 'XDDDDDDD');
  //await page.screenshot({ path: `example${i}.png` });
  await browser.close();
}

for (let i = 10; i < 100; i++) {
  codes.push('000053' + i);
}
console.log(codes);

browse();

/*
const browser = await await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');
  */

async function ex() {
  const browser = await firefox.launch();
  // Create pages, interact with UI elements, assert values
  await browser.close();
}

/*
function printCodes() {
  for (let i = 10; i < 100; i++) {
    console.log("'" + '000053' + i + "'");
  }
}

printCodes()
*/
