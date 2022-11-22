import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Loading from '../components/Loading';
import {useGlobalContext} from '../context';

function SingleCocktail() {
  const {id} = useParams();
  const {loading, setLoading} = useGlobalContext();
  // const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    const getCocktail = async() => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            console.log(data);
            if(data.drinks) {
                const {
                    strDrink: name,
                    strDrinkThumb: image,
                    strAlcoholic: info,
                    strCategory: category,
                    strGlass: glass,
                    strInstructions: instructions,
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5
                } = data.drinks[0];
                const ingredients = [
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5
                ]
                const newCocktail = {
                    name,
                    image,
                    info,
                    category,
                    glass,
                    instructions,
                    ingredients
                }
                setCocktail(newCocktail);
            } else {
                setCocktail(null);
            }
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }
    getCocktail();
  }, [id]);
  if(loading) {
    return <Loading />
  }
  if(!cocktail) {
    return <h2 className='section-title'>No Cocktail To Display</h2>
  } else {
    const {
        name,
        image,
        category,
        info,
        glass,
        instructions,
        ingredients
    } = cocktail
    return (
        <section className='section cocktail-section'>
            <Link to='/home' className='btn btn-primary'>
                Back To Home
            </Link>
            <h2 className='section-title'>{name}</h2>
            <div className='drink'>
                <img src={image} alt={name}></img>
                <div className='drink-info'>
                    <p>
                        <span className='drink-data'>name: </span>{name}
                    </p>
                    <p>
                        <span className='drink-data'>category: </span>{category}
                    </p>
                    <p>
                        <span className='drink-data'>info: </span>{info}
                    </p>
                    <p>
                        <span className='drink-data'>glass: </span>{glass}
                    </p>
                    <p>
                        <span className='drink-data'>instructons: </span>{instructions}
                    </p>
                    <p>
                        <span className='drink-data'>ingredients: </span>
                        {ingredients.map((item, index) => {
                            return item ? <span key={index}>{item}</span> : null
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
  }
}
export default SingleCocktail;
