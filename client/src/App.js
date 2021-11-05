import React, { useState } from 'react'
import axios from 'axios'
import './app.css'
import image from './movieposter.png'
import MovieCard from './components/MovieCard'
import FullMovieDescription from './components/FullMovieDescription'
import SearchingImage from './components/SearchingImage'
import Header from './components/Header'

const BASE_URL = 'http://localhost:3001/api/movies'

const App = () => {
  const [ movies, setMovies ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ searching, setSearching ] = useState(false)
  const [ movie, setMovie ] = useState({})
  const [ savedMovies, setSavedMovies ] = useState([])
  const [ scrollPosition, setScrollPosition ] = useState(0)
  const [ favouriteMovies, setFavouriteMovies ] = useState([])

  const handleSearchFilterUpdate = event => {
    setFilter(event.target.value)
  }

  const handleMovieSelect = name => {
    setMovie(name)
    setSavedMovies(movies)
    setMovies([])
    setScrollPosition(window.scrollY)
  }

  const handleMovieSearchSubmit = event => {
    event.preventDefault()
    const movieFilter = filter
    setSearching(true)
    setMovies([])
    setMovie('')

    axios
      .get(`${BASE_URL}/${movieFilter}`)
        .then(movie => {
          console.log(movie)
          setMovies(movie.data)
          setSearching(false)
        })
        .catch(error => {
          setMovies([])
          setSearching(false)
      })
  }

  const handleImageError = (event) => {
    event.target.setAttribute('src', image)
  }

  const handleFullMovieDescriptionClose = () => {
    setMovie({})
    setMovies(savedMovies)
    setTimeout(() => window.scroll(0, scrollPosition), 1)
  }

  const handleFavouriteMovieAdding = (movie) => {
    if (favouriteMovies.filter(m => m._id === movie._id).length > 0) {
      setFavouriteMovies(favouriteMovies.filter(m => m._id !== movie._id))
    } else {
      setFavouriteMovies(favouriteMovies.concat(movie))
    }
  }

  const handleShowFavourites = () => {
    setSavedMovies(movies)
    setMovies(favouriteMovies)
  }

  return (
    <div id='wrapper'>
      <Header headerText='MOVIEVIEWER' 
        handleSubmit={handleMovieSearchSubmit}
        handleFilter={handleSearchFilterUpdate}
        handleShowFavourites={handleShowFavourites}
      />
      {searching && <SearchingImage />}
      {movie._id 
        ? <FullMovieDescription movie={movie} 
            handleMovieClose={handleFullMovieDescriptionClose}
            handleFavouriteMovies={handleFavouriteMovieAdding}
            favourites={favouriteMovies}/> 
        : null}
      <div className='flex-container'>
        {movies.length > 0
          ? movies.map(movie => 
              <MovieCard className='column'
                key={`${movie._id}`}
                movie={movie}
                handleImage={handleImageError}
                handleMovieSelect={handleMovieSelect}
                image={image}
              />)
          : null}
      </div>
    </div>
  )
}

export default App