import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
<<<<<<< HEAD
console.log("🌐 Scraping:", url);

try {
    const res = await axios.get(url, {
    headers: {
        "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    },
    timeout: 5000
=======
  console.log("🌐 Scraping:", url);

  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
      },
      timeout: 8000
>>>>>>> 01e8489 (Initial commit: BeyondChats full-stack assignment)
    });

    const $ = cheerio.load(res.data);

<<<<<<< HEAD
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
=======
    $("script, style, nav, footer, header, aside").remove();

    let content =
      $(".blog-content").text().trim() ||
      $(".post-content").text().trim() ||
      $(".entry-content").text().trim() ||
      $("article").text().trim() ||
      $("main").text().trim();

    content = content.replace(/\s+/g, " ");

    if (!content || content.length < 200) {
      throw new Error("Content too short");
    }

    return content.slice(0, 3000);

  } catch (err) {
    console.warn("⚠️ Scrape failed, using fallback");

    return `
This article discusses modern customer support strategies, chatbot usage,
AI-driven automation, and best practices for improving response time,
customer satisfaction, and operational efficiency.
    `.trim();
  }
>>>>>>> 01e8489 (Initial commit: BeyondChats full-stack assignment)
}
