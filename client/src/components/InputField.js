const InputField = ({ handleSubmit, handleFilter }) => (
  <div className='inputField'>
    <form onSubmit={handleSubmit}>
      <input type='text' onChange={handleFilter} />
      <input type='submit' />
    </form>
  </div>
)

export default InputField