import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'; 

const InputField = ({ handleSubmit, handleFilter, handleShowFavourites}) => (
  <div className='input-field flex-container'>
    <form onSubmit={handleSubmit}>
      <TextField className='text-field' id='search-field' label='search' variant='filled' onChange={handleFilter} />
      <Button id='submit-button' className='button' type='submit' variant='contained'>Search</Button>
    </form>
    <AddIcon id='favourites-button' onClick={handleShowFavourites} />
  </div>
)

export default InputField