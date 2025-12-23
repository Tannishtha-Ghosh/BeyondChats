import { useEffect, useState } from "react";
import { fetchArticles } from "./api";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>BeyondChats Articles</h1>

      {articles.map((a) => (
        <div key={a.id} style={{ marginBottom: "1.5rem" }}>
          <h3>{a.title}</h3>
          <p>{a.content.slice(0, 150)}...</p>
          <small>Type: {a.type}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
