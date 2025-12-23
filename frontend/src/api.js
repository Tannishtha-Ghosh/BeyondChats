import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export async function fetchArticles() {
const res = await axios.get(`${API_BASE}/articles`);
return res.data;
}
