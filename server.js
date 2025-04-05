const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://newsapi.org";

app.use("/", async (req, res) => {
  const url = `${BASE_URL}${req.url}`;
  console.log(`Proxying request to: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": req.headers["authorization"], // APIキーをフロントエンドから渡す
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json(); // レスポンスを JSON で取得
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Proxy error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました。ポート: ${PORT}`);
});
