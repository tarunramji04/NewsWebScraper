import puppeteer from "puppeteer";

async function scrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.foxnews.com");

    const [headlineElement] = await page.$$('xpath/.//*[@id="wrapper"]/div[2]/div[2]/main/div[1]/div/article/div[2]/header/h3/a');
    if (headlineElement) {
        const headlineText = await page.evaluate(el => el.textContent, headlineElement);
        console.log(headlineText);
    } else {
        console.log("Headline not found");
    }

    await browser.close();
}

scrape();