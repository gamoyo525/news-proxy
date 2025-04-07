const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://newsapi.org/v2";
const API_KEY = "1a5a88eb386244ff9e7f82966e28e009"; // 

app.use("/", async (req, res) => {
  const url = `${BASE_URL}${req.url}${req.url.includes("?") ? "&" : "?"}apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
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
