import InputField from './InputField'

const Header = ({ headerText, handleSubmit, handleFilter, handleShowFavourites }) => (
  <div className='header flex-container'>
    <h1>{headerText}</h1>
    <InputField handleSubmit={handleSubmit} handleFilter={handleFilter} handleShowFavourites={handleShowFavourites}/>
  </div>
)

export default Header