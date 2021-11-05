import InputField from './InputField'

const Header = ({ headerText, handleSubmit, handleFilter, handleShowFavourites }) => (
  <div className='header'>
    <h1>{headerText}</h1>
    <InputField handleSubmit={handleSubmit} handleFilter={handleFilter}/>
    <button onClick={handleShowFavourites}>Favourites</button>
  </div>
)

export default Header