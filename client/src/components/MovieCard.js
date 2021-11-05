const MovieCard = ({movie, handleMovieSelect, handleImage, image}) => {
    const year = movie.year
    const genres = movie.genres?.join(', ') || 'No data'
    const directors = movie.directors?.join(', ') || 'No data'
    const plot = movie.plot || 'No plot added yet'
    const poster = movie.poster || image
    const imdbRating = movie.imdb?.rating || '-'
    const title = movie.title
    
    return (
      <div className='movie' onClick={() => handleMovieSelect(movie)}>
        <div className='info'>
          <h3>{title} ({year})</h3><br/>
          <p><b>Genres</b>: {genres}</p>
          <p><b>Director</b>: {directors}</p>
          <p><b>Plot:</b> {plot}</p>
        </div>
        <img src={poster} alt='POSTER' onError={handleImage}/>
        <a href={`https://www.imdb.com/title/tt${movie.imdb.id}`}>
          <div className='ratingsBar'>
            <p>IMDB {imdbRating}</p>
          </div>
        </a>
      </div>
    )
  }

  export default MovieCard