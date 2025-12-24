import axios from "axios";
import * as cheerio from "cheerio";

export async function getBlogLinks() {
  const url = "https://beyondchats.com/blogs/";
  console.log("🔎 Fetching blog list");

  const res = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(res.data);
  const links = new Set();

  $("a").each((_, el) => {
    const href = $(el).attr("href");

    if (
      href &&
      href.includes("/blogs/") &&
      !href.endsWith("/blogs/")
    ) {
      const fullUrl = href.startsWith("http")
        ? href
        : `https://beyondchats.com${href}`;

      links.add(fullUrl);
    }
  });

  return Array.from(links);
}
