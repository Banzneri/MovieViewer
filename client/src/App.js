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
  const [ shownMovies, setShownMovies ] = useState([])
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ isSearching, setIsSearching ] = useState(false)
  const [ selectedMovie, setSelectedMovie ] = useState({})
  const [ savedMovies, setSavedMovies ] = useState([])
  const [ scrollPosition, setScrollPosition ] = useState(0)
  const [ favouriteMovies, setFavouriteMovies ] = useState([])

  const handleSearchFilterUpdate = event => {
    setSearchFilter(event.target.value)
  }

  const handleMovieSelect = name => {
    setSelectedMovie(name)
    setSavedMovies(shownMovies)
    setShownMovies([])
    setScrollPosition(window.scrollY)
  }

  const handleMovieSearchSubmit = event => {
    event.preventDefault()
    const movieFilter = searchFilter
    setIsSearching(true)
    setShownMovies([])
    setSelectedMovie('')

    axios
      .get(`${BASE_URL}/${movieFilter}`)
        .then(movie => {
          console.log(movie)
          setShownMovies(movie.data)
          setIsSearching(false)
        })
        .catch(error => {
          setShownMovies([])
          setIsSearching(false)
      })
  }

  const handleImageError = (event) => {
    event.target.setAttribute('src', image)
  }

  const handleFullMovieDescriptionClose = () => {
    setSelectedMovie({})
    setShownMovies(savedMovies)
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
    setSavedMovies(shownMovies)
    setShownMovies(favouriteMovies)
  }

  return (
    <div id='wrapper'>
      <Header headerText='MOVIEVIEWER' 
        handleSubmit={handleMovieSearchSubmit}
        handleFilter={handleSearchFilterUpdate}
        handleShowFavourites={handleShowFavourites}
      />
      {isSearching && <SearchingImage />}
      {selectedMovie._id 
        ? <FullMovieDescription movie={selectedMovie} 
            handleMovieClose={handleFullMovieDescriptionClose}
            handleFavouriteMovies={handleFavouriteMovieAdding}
            favourites={favouriteMovies}/> 
        : null}
      <div className='flex-container'>
        {shownMovies.length > 0
          ? shownMovies.map(movie => 
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