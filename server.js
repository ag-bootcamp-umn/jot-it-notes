const express = require("express");
const routes = require("./routes");

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// re-route everything to the routes folder
app.use(routes);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
