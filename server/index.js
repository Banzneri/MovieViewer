const { MongoClient } = require("mongodb")
const express = require("express")
const cors = require("cors")
const process = require("process")

const URI = "mongodb+srv://Banzneri:Jaakkola12@cluster0.i2p0r.mongodb.net/sample_mflix?retryWrites=true&w=majority"
const DATABASE_NAME = 'sample_mflix'
const COLLECTION_NAME = 'movies'
const PORT = 3001

const searchResultLimit = 50

const client = new MongoClient(URI)
const app = express()

app.use(express.json())
app.use(cors())

client.connect()

const findMoviesByNameNameContains = async (name) => {
  let movies = undefined
  try {
    const database = client.db(DATABASE_NAME)
    const collection = database.collection(COLLECTION_NAME)
    
    const regExp = new RegExp(`${name}`, 'i')
    const query = { title: { $regex: regExp}}
    // const altQuery = { $text: { $search: name }}

    const result = collection.find(query).limit(searchResultLimit)

    if (!result) return response.status(404).end()

    movies = await result.toArray()
    movies.sort(e => e - name)

    console.log(movies)
  } finally {
    return movies
  }
}

const findMovieByName = async (movieName) => {
  let movie = undefined

  try {
    const database = client.db(DATABASE_NAME)
    const movies = database.collection(COLLECTION_NAME)
    const query = { title: movieName }

    movie = await movies.findOne(query)

    console.log(movie)
  } finally {
    return movie
  }
}

app.get('/api/movies/:name', (request, response) => {
  const movieName = request.params.name;
  findMoviesByNameNameContains(movieName).then(movie => {
    movie ? response.json(movie) : null
  })
})

app.get('/api/movies/movie/:name', (request, response) => {
  const movieName = request.params.name;
  findMovieByName(movieName).then(movie => {
    movie ? response.json(movie) : null
  })
})

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`) )

process.on('exit', () => client.close())