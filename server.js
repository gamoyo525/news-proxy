const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://newsapi.org";
const API_KEY = process.env.NEWS_API_KEY;

app.use("/", async (req, res) => {
  const targetUrl = `${BASE_URL}${req.url}`;

  try {
    const response = await fetch(targetUrl + `&apiKey=${API_KEY}`);
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
