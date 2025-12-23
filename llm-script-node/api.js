import axios from "axios";

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


