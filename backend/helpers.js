import puppeteer from "puppeteer";

export async function scrapeFox() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.foxnews.com");

    const [headline] = await page.$$('xpath/.//*[@id="wrapper"]/div[2]/div[2]/main/div[1]/div/article/div[2]/header/h3/a');
    const headlineText = await page.evaluate(element => element.textContent, headline);
    const headlineLink = await page.evaluate(element => element.href, headline);
    const [img] = await page.$$('xpath/.//*[@id="wrapper"]/div[2]/div[2]/main/div[1]/div/article/div[1]/a/picture/img');
    const imgSrc = await page.evaluate(element => element.src, img);

    console.log(headlineText);
    console.log(headlineLink);
    console.log(imgSrc);
    await browser.close();

    return { headlineText, headlineLink, imgSrc };
}

export async function scrapeCNN () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.cnn.com/");

    const [headline] = await page.$$('xpath/./html/body/div[1]/section[3]/section/div/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[2]/div[1]/div[3]/a/h2');
    const headlineText = await page.evaluate(element => element.textContent, headline);
    const [link] = await page.$$('xpath/./html/body/div[1]/section[3]/section/div/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[2]/div[1]/div[3]/a');
    const headlineLink = await page.evaluate(element => element.href, link);
    const [img] = await page.$$('xpath/./html/body/div[1]/section[3]/section/div/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[2]/div[1]/div[4]/div/div/div[1]/a[1]/div/div/div/div[1]/picture/img');
    const imgSrc = await page.evaluate(element => element.src, img);

    console.log(headlineText);
    console.log(headlineLink);
    console.log(imgSrc);
    await browser.close();

    return { headlineText, headlineLink, imgSrc };
}
