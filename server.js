const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://newsapi.org";

app.use("/", async (req, res) => {
  const url = `${BASE_URL}${req.url}`;
  const apiKey = req.headers["x-api-key"]; // ← フロントエンドからこのヘッダーで送る！

  if (!apiKey) {
    return res.status(400).json({ error: "Missing API key in request headers" });
  }

  try {
    const response = await fetch(url + `&apiKey=${apiKey}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Proxy error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
