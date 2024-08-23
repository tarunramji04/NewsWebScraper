import puppeteer from 'puppeteer'
import { scrapeFox, scrapeCNN } from './scraping.js'
import { initializeFirebaseApp, uploadData } from './firebase.js'
import functions from 'firebase-functions'

const options = {
    memory: '1GB',
    timeoutSeconds: 400,
};

async function scrape() {
    let browser;
    try {
        browser = await puppeteer.launch();
        const foxPage = await browser.newPage();
        const cnnPage = await browser.newPage();

        const [fox, cnn] = await Promise.all([scrapeFox(foxPage), scrapeCNN(cnnPage)]);
        initializeFirebaseApp();
        if (fox.headlineText) {
            await uploadData("fox", fox.headlineText, fox.headlineLink, fox.imgSrc);
        }
        if (cnn.headlineText) {
            await uploadData("cnn", cnn.headlineText, cnn.headlineLink, cnn.imgSrc);
        }
    } catch (error) {
        console.log(error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

export const scheduledScrape = functions.runWith(options).pubsub.schedule('every 60 minutes').onRun(async () => {
    console.log('Scheduled scrape function running...');
    await scrape();
});
