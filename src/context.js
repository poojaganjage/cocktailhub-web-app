import React, {useState, useEffect, useCallback, useContext, createContext} from 'react';

const AppContext = createContext();

function AppProvider({children}) {
  const[loading, setLoading] = useState(false);
  const[searchTerm, setSearchTerm] = useState('');
  const[cocktails, setCocktails] = useState([]);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  console.log(cocktails);

  const fetchDrinks = useCallback(async() => {
    setLoading(true);
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const {drinks} = data;
        if(drinks) {
            const newCocktails = drinks.map((item) => {
                const {idDrink, strDrink, strDrinkThumb, strGlass} = item;
                return {
                    id: idDrink,
                    name: strDrink,
                    image: strDrinkThumb,
                    glass: strGlass
                }
            });
            setCocktails(newCocktails);
        } else {
            setCocktails([]);
        }
        setLoading(false);
    } catch(error) {
        console.log(error);
        setLoading(false);
    }
  }, [searchTerm]);
  
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);
  return (
    <AppContext.Provider value={{loading, cocktails, searchTerm, setLoading, setSearchTerm}}>
        {children}
    </AppContext.Provider>
  );
}
export const useGlobalContext = () => {
    return (
        useContext(AppContext)
    )
}
export default AppProvider;
