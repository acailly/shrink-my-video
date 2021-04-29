const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/shrink-my-video", express.static(__dirname));

app.listen(process.env.PORT || 8080);
