import React from 'react';
import {useGlobalContext} from '../context';

function Search() {
  const {searchTerm, setSearchTerm} = useGlobalContext();
  const searchValue = React.useRef(searchTerm);
  console.log(searchValue);
  console.log(searchTerm);

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  function searchCocktail() {
    setSearchTerm(searchValue.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'></label>
          <input 
            type='text' 
            name='name'
            ref={searchValue}
            onChange={searchCocktail} 
            placeholder='Search Cocktail...'
          />
        </div>
      </form>
    </section>
  );
}
export default Search;
