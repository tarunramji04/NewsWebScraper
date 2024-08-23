export async function scrapeFox(page) {
    await page.goto("https://www.foxnews.com", { timeout: 100000 });

    const [headline] = await page.$$('xpath/.//*[@id="wrapper"]/div[2]/div[2]/main/div[1]/div/article/div[2]/header/h3/a');
    const headlineText = headline ? await page.evaluate(element => element.textContent, headline) : null;
    const headlineLink = headline ? await page.evaluate(element => element.href, headline) : null;
    const [img] = await page.$$('xpath/.//*[@id="wrapper"]/div[2]/div[2]/main/div[1]/div/article/div[1]/a/picture/img');
    const imgSrc = img ? await page.evaluate(element => element.src, img) : null;
    
    return { headlineText, headlineLink, imgSrc };
}

export async function scrapeCNN (page) {
    await page.goto("https://www.cnn.com/", { timeout: 100000 });

    const [headline] = await page.$$('xpath/./html/body/div[1]/section[3]/section/div/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[2]/div[1]/div[3]/a/h2');
    const headlineText = headline ? await page.evaluate(element => element.textContent, headline) : null;
    const [link] = await page.$$('xpath/./html/body/div[1]/section[3]/section/div/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[2]/div[1]/div[3]/a');
    const headlineLink = link ? await page.evaluate(element => element.href, link) : null;
    const [img] = await page.$$('xpath/./html/body/div[1]/section[3]/section/div/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[2]/div[1]/div[4]/div/div/div[1]/a[1]/div/div/div/div[1]/picture/img');
    const imgSrc = img ? await page.evaluate(element => element.src, img) : null;
    
    return { headlineText, headlineLink, imgSrc };
}

// class="zone__title-url"
