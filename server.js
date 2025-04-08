const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://newsapi.org/v2";
const API_KEY = "1a5a88eb386244ff9e7f82966e28e009"; // ← ここに自分のAPIキーを埋め込む

app.use("/", async (req, res) => {
  // 不正なリクエストパスをブロック（例: favicon.ico）
  if (!req.url.startsWith("/top-headlines") && !req.url.startsWith("/everything")) {
    return res.status(404).json({ error: "Unsupported endpoint" });
  }

  // フルURL作成（クエリの ? / & 判定）
  const url = `${BASE_URL}${req.url}${req.url.includes("?") ? "&" : "?"}apiKey=${API_KEY}`;
  console.log("🛰️ Proxying request to:", url);

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    // 応答がJSONじゃない場合はエラー
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("❌ Invalid response (not JSON):", text);
      return res.status(500).json({ error: "Invalid JSON response from NewsAPI" });
    }

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("💥 Proxy error:", err);
    res.status(500).json({ error: "Proxy error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
