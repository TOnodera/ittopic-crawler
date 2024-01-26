import { createPlaywrightRouter } from "crawlee";

export const router = createPlaywrightRouter();

router.addHandler('ARTICLE', async ({request, page, log}) => {
    const title = await page.title(); 
    log.info(`title is ${title}`);
    const content = await page.locator(".style-itrjxe").first().textContent();
    console.info(content);
});

router.addDefaultHandler(async ({request, page, enqueueLinks, log}) => {
    const selector = "article.style-l2axsx > a";
    // Extract links from the current page
    // and add them to the crawling queue.
    await enqueueLinks({selector, label: "ARTICLE"});
});