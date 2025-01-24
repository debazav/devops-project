const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello, DevOps!" });
});

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});