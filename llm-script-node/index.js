<<<<<<< HEAD
import "dotenv/config";
import { fetchLatestArticle, publishArticle } from "./api.js";
import { getMockSearchResults } from "./mockSearch.js";
import { scrapeArticle } from "./scraper.js";
import { rewriteArticle } from "./llm.js";

(async () => {
  try {
    console.log("🚀 Phase 2 script started");

    const article = await fetchLatestArticle();
    if (!article) {
      console.log("⚠️ No original article found");
      return;
    }

    console.log("✅ Fetched article:", article.title);

    const [url1, url2] = getMockSearchResults(article.title);

    const ref1 = await scrapeArticle(url1);
    const ref2 = await scrapeArticle(url2);

    const updatedContent = await rewriteArticle(
      article.content,
      ref1,
      ref2
    );

    const cleanTitle = article.title.replace(/\s*\(Updated\)+/g, "").trim();

await publishArticle({
  title: `${cleanTitle} (Updated)`,
  content: updatedContent,
  type: "generated",
  parent_article_id: article.parent_article_id ?? article.id,
  references: [url1, url2],
});


    console.log("✅ Updated article published successfully");
  } catch (err) {
    console.error("❌ Phase 2 script failed:", err.message);
  }
})();
=======
import dotenv from "dotenv";
dotenv.config();


import { getBlogLinks } from "./crawler.js";
import { scrapeArticle } from "./scraper.js";
import { rewriteArticle } from "./llm.js";
import { saveArticle } from "./api.js";

async function run() {
  console.log("🚀 Starting BeyondChats LLM pipeline");

  const links = await getBlogLinks();

  if (!links.length) {
    console.log("❌ no original article found");
    return;
  }

  console.log(`🔗 Found ${links.length} articles`);

  for (const url of links.slice(0, 3)) {
    try {
      console.log("\n🌐 Processing:", url);

      const content = await scrapeArticle(url);

      const rewritten = await rewriteArticle(
        content,
        content.slice(0, 1000),
        content.slice(1000, 2000)
      );

      await saveArticle({
  title: "BeyondChats Blog Rewrite",
  content: rewritten,
  type: "generated",
  references: [url]
});


      console.log("✅ Saved successfully");

    } catch (err) {
      console.error("❌ Failed:", err.message);
    }
  }

  console.log("\n🎉 Pipeline completed");
}

run();
>>>>>>> 01e8489 (Initial commit: BeyondChats full-stack assignment)
