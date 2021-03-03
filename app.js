const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan("common"));
app.use(cors());

const playstoreApps = require('./playstore.js')

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query

  if (genres) {
    if (!["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(genres)) {
      return res.status(400).send("Genres must be one of the following: Action, Arcade, Card, Casual, Puzzle, Strategy")
    }
  }

  //if (genres) {
  //  let results = playstoreApps.filter((item) => {
  //    item["Genres"].includes(genres)
  //  })
  //  return results
  //}

  if (sort) {
    if (!["App", "Rating"].includes(sort)) {
      return res.status(400).send("Sort must be one of app or rating")
    }
  } 

  let results = playstoreApps.filter((playstoreApp) => {
    if (genres) {
      playstoreApp["Genres"].includes(genres)
    } else {
      playstoreApp
    }
  })

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    })
  }
  
  res.json(playstoreApps)
})

app.listen(8000, () => {
  console.log("Server started on PORT 8000 http://localhost:8000/app")
})