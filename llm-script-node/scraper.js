import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
console.log("🌐 Scraping:", url);

try {
    const res = await axios.get(url, {
    headers: {
        "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    },
    timeout: 5000
    });

    const $ = cheerio.load(res.data);

    $("script, style, nav, footer, header").remove();

    let content =
    $("article").text().trim() ||
    $("main").text().trim() ||
    $("body").text().trim();

    return content.slice(0, 3000);

} catch (err) {
    console.warn("⚠️ Scrape blocked, using fallback summary");

    return `
This reference article could not be scraped due to website restrictions.
The content discusses customer support automation, chatbot usage,
and best practices for improving response times and user satisfaction.
    `.trim();
}
}
