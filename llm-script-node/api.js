import axios from "axios";

<<<<<<< HEAD
export async function fetchLatestArticle() {
const res = await axios.get("http://localhost:8000/api/articles");

  // ONLY pick original articles
return res.data.find(a => a.type === "original");
}
export async function publishArticle(payload) {
return axios.post("http://localhost:8000/api/articles", {
    ...payload,
    slug: payload.title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/\s+/g, "-"),
    references: payload.references ?? []
});
}


=======
export async function saveArticle(payload) {
  try {
    const res = await axios.post(
      `${process.env.LARAVEL_API_BASE}/articles`,
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res.data;
  } catch (error) {
    console.error("❌ Failed to save article:", error.message);
    throw error;
  }
}
>>>>>>> 01e8489 (Initial commit: BeyondChats full-stack assignment)
