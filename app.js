const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("common"));
app.use(cors());

const playstoreApps = require("./playstore.js");

app.get("/apps", (req, res) => {
  const { sort, genres = "" } = req.query;

  if (genres) {
    if (
      !["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(
        genres
      )
    ) {
      return res
        .status(400)
        .send(
          "Genres must be one of the following: action, arcade, card, casual, puzzle, strategy"
        );
    }
  }

  let results = playstoreApps.filter((item) =>
    item["Genres"].toLowerCase().includes(genres.toLowerCase())
  );

  if (sort) {
    if (!["app", "rating"].includes(sort)) {
      return res.status(400).send("Sort must be one of app or rating");
    }
  }

  if (sort) {
    let filter = "";

    if (sort === "app") {
      filter = "App";
      results.sort((a, b) => {
        return a[filter].toLowerCase() > b[filter].toLowerCase()
          ? 1
          : a[filter].toLowerCase() < b[filter].toLowerCase()
          ? -1
          : 0;
      });
    }

    if (sort === "rating") {
      filter = "Rating";
      results.sort((a, b) => {
        return a[filter] > b[filter] ? -1 : a[filter] < b[filter] ? 1 : 0;
      });
    }
  }

  if (genres) {
    return res.send(results);
  }

  res.json(results);
});

// app.listen(8000, () => {
// console.log("Server started on PORT 8000 http://localhost:8000/apps");
// });

module.exports = app;
