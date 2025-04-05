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
        "Authorization": req.headers["authorization"], // または apiKeyをクエリに含める
      },
    });

    const data = await response.text(); // JSONではなく text にすることで柔軟に
    res.status(response.status).send(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Proxy error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
"dependencies": {
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "node-fetch": "^2.6.7"
}
