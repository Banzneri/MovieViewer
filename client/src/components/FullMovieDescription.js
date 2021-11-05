import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add';

const FullMovieDescription = ({ movie, handleMovieClose, handleFavouriteMovies, favourites}) => {
    const isInFavourites = () => {
      for (let i = 0; i < favourites.length; i++) {
        if (favourites[i]._id === movie._id) return true
      }
      return false
    }

    const addIconColor = isInFavourites() ? 'green' : 'white'

    return (
        <div className='full-movie'>
          <div className='full-info'>
            <h2>{movie.title}</h2>
            <br />
            <p>{movie.fullplot}</p>
            <div className='full-details'>
                | {movie.year} | {movie.countries.toString()} | {movie.runtime} min |
                <AddIcon 
                  className='add-icon hover-icon' 
                  onClick={() => handleFavouriteMovies(movie)} 
                  style={{fill: addIconColor}}
                />
            </div>
          </div>
          <CloseIcon onClick={handleMovieClose} className='close-icon hover-icon'/>
        </div>
    );
}

  export default FullMovieDescription