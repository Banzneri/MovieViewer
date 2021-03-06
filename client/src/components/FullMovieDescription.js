import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add';

const FullMovieDescription = ({ movie, handleMovieClose, handleFavouriteMovies, favourites }) => {
    const isFavourite = favourites.some(e => e._id === movie._id)
    const classNames = 'add-icon hover-icon' + (isFavourite ? ' add-icon-active' : '')

    return (
        <div className='full-movie'>
          <div className='full-info'>
            <div className='flex-container'>
              <h2>{movie.title}</h2>
              <CloseIcon onClick={handleMovieClose} className='close-icon hover-icon'/>
            </div>
            <br/>
            <p>{movie.fullplot}</p>
            <div className='full-details'>
                | {movie.year} | {movie.countries.toString()} | {movie.runtime} min |
                <AddIcon className={classNames} onClick={() => handleFavouriteMovies(movie)}
                />
            </div>
          </div>
        </div>
    );
}

  export default FullMovieDescription