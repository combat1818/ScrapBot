const { firefox } = require('playwright');
/* '00005372', */
let codes = require('./codes.js');

async function browse() {
  const browser = await firefox.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    'https://przegladarka-ekw.ms.gov.pl/eukw_prz/KsiegiWieczyste/wyszukiwanieKW'
  );
  //await page.waitForSelector('#content-wrapper');
  //const text = await page.innerHTML('#content-wrapper');
  //await page.waitForSelector('#cyfraKontrolna');
  //const text = await page.isVisible('#cyfraKontrolna');
  for (let i = 0; i < codes.length; i++) {
    //await page.waitForTimeout(200);
    await page.fill('#kodWydzialuInput', 'GW1G');
    await page.fill('#numerKsiegiWieczystej', codes[i]);
    await page.fill('#cyfraKontrolna', '7');
    await page.click('button#wyszukaj');
    await page.waitForTimeout(500);
    const handle = await page.$('#cyfraKontrolna--cyfra-kontrolna');
    if (handle != null) {
      let x = await handle.isHidden();
    } else {
      console.log(codes[i]);
      await page.goto(
        'https://przegladarka-ekw.ms.gov.pl/eukw_prz/KsiegiWieczyste/wyszukiwanieKW'
      );
      continue;
    }

    //console.log(x);

    /*let form = await page.$('#kryteriaWKW');
    console.log(form);*/

    let handleCaptcha = await page.$('#recaptchaResponseErrors');
    let y = await handleCaptcha.innerText();
    //console.log(y);
    if (y == '') {
      //console.log('hurra');
    } else {
      i--;
      await page.goto(
        'https://przegladarka-ekw.ms.gov.pl/eukw_prz/KsiegiWieczyste/wyszukiwanieKW'
      );
    }
  }

  await browser.close();
}

browse();

/*     console.log(page.url()); */

/*
Dziala
const handle = await page.$('#cyfraKontrolna--cyfra-kontrolna');
  let x = await handle.isHidden();
  console.log(x);

*/

/*
const handle = await page.$('#cyfraKontrolna--cyfra-kontrolna');
  let x = await handle.isHidden();
  console.log(x);

  let handleCaptcha = await page.$('#recaptchaResponseErrors');
  let y = await handleCaptcha.innerText();
  console.log(y);
  if (y == '') {
    console.log('hurra');
  }
  */
