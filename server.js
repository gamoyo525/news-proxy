const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // POSTリクエストに必要

const NEWS_API_BASE = "https://newsapi.org";
const TRANSLATE_API_URL = "https://libretranslate.com/translate";

// NewsAPI用のプロキシ
app.use("/v2", async (req, res) => {
  const url = `${NEWS_API_BASE}${req.originalUrl}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("NewsAPIエラー:", error);
    res.status(500).json({ error: "NewsAPIの取得に失敗しました" });
  }
});

// LibreTranslate用のプロキシ
app.post("/translate", async (req, res) => {
  try {
    const response = await fetch(TRANSLATE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("翻訳エラー:", error);
    res.status(500).json({ error: "翻訳に失敗しました" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
