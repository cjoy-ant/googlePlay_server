const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan("common"));
app.use(cors());

const playstoreApps = require('./playstore')

app.get('/app', (req, res) => {
  const { sort, genres } = req.query

  if (sort) {

  }

  if (genres) {

  }

})

app.listen(8000, () => {
  console.log("Server started on PORT 8000 http://localhost:8000/app")
})