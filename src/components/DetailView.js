import React from 'react';
import './styles/DetailView.css';

const DetailView = ({ pokemon }) => {
  const { id, name, sprite, type, evolves_from_species, evolves_to } = pokemon;
   

  return (
    <section className="detail-view">
      <img id='imagen' src={sprite} className='sprite-image' alt="sprite"/>
      <div className='data-wrapper'>
        <h1 className='data-name'>Nº: {id} {name}</h1>
        <p className="data-char">Tipo: {type}</p>
		 <p className="data-char">Anterior: {evolves_from_species}</p>
		 <p className="data-char">Evolución: {evolves_to}</p>
      </div>
    </section>
  )
}

export default DetailView;