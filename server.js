const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const NEWS_API_URL = "https://newsapi.org";
const TRANSLATE_API_URL = "https://libretranslate.com";

app.use("/v2", async (req, res) => {
  const url = `${NEWS_API_URL}${req.originalUrl}`;
  try {
    const response = await fetch(url, {
      headers: { Authorization: req.headers["authorization"] },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("NewsAPI fetch error:", error);
    res.status(500).json({ error: "NewsAPI proxy error" });
  }
});

app.post("/translate", async (req, res) => {
  try {
    const response = await fetch(`${TRANSLATE_API_URL}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Translate proxy error:", error);
    res.status(500).json({ error: "Translation proxy error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
