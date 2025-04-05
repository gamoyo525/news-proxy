const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const NEWS_API_BASE = "https://newsapi.org";
const TRANSLATE_API_URL = "https://libretranslate.com/translate";

// NewsAPIのプロキシ
app.use("/v2", async (req, res) => {
  const url = `${NEWS_API_BASE}${req.originalUrl}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  res.json(data);
});

// LibreTranslateへのプロキシ
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
    console.error("翻訳APIプロキシエラー:", error);
    res.status(500).json({ error: "翻訳失敗" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました。ポート: ${PORT}`);
});
