import React from 'react';
import {NavLink} from 'react-router-dom';

function Cocktail({image, name, id, glass, info}) {
  return (
    <article>
      <div>
        <img src={image} alt={name} />
      </div>
      <div className='img-container'>
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <NavLink to={`/cocktail/${id}`} className='btn btn-primary btn-details'>
          Details
        </NavLink>
      </div>
    </article>
  );
}
export default Cocktail;
