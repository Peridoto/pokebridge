import React, { Component } from 'react';
import PokeList from './PokeList';
import DetailView from './DetailView';
import SearchBar from './SearchBar';
import Pokemon from './Pokemon';
import './styles/App.css';
import 'bulma/css/bulma.css';
import { Cabecera } from './cabecera';

class App extends Component {

state = { databuscador: [] }


 _handleResults = (databuscador) => {
  this.setState({databuscador})
  }
  





 handleTermChange(term) {
    console.log(term);
  }
  
  constructor() {
    super();
    this.state = {
      pokemon: {}
    };
	 this.handleOnClick = this.handleOnClick.bind(this);
	  this.handleLoad = this.handleLoad.bind(this);
	  
  }
  
   componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }
  
  handleLoad() {
 var elem = document.getElementById('imagen');
  if(elem.getAttribute('src') === null)
  {
   
	 document.getElementById('imagen').src = "http://appware.es/img/pokeball1.png";
  }
  else
  {
   alert("bien");
  }
 }
  
    /*{mode: 'no-cors'}) evitar errores cross origin   headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET'
      }*/
	  
	  
	  /*,{mode: 'no-cors',

 headers:{
        'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials':true,
		'Content-Type' : 'pplication/json',
		'Access-Control-Allow-Methods' : 'GET, POST, PUT'
 
      }}*/
	  
	  /*soluciones finales añadir https y la url acabada en id/ */
	
	/* https://pokeapi.co/api/v2/evolution-chain/1/ */
	
	
	
	
	
	/* version funcional base 
handleOnClick(id) {
 console.log(id);
    fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/')
	
	
      .then(res => res.json())
      .then(data => {
        const pokemon = new Pokemon(data);

		 console.log(pokemon);
		this.setState({ pokemon });
       
      })
      .catch(err => console.log(err));
  }
 */
  
  
  /* SEGUNDO INTENTO, casi funciona 
  async handleOnClick(id) {
 console.log(id);
    try{
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      var data = await Promise.all([
        fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/').then((res) => res.json()),// parse each response as json
        fetch('https://pokeapi.co/api/v2/evolution-chain/'+id+'/').then((res) => res.json())
      ])
      .then(data => {
        const pokemon = new Pokemon(data);

		console.log("EMPIEZA DATA");
		 console.log(data);
		this.setState({ pokemon });
       
      })
      .catch(err => console.log(err));
  }
  catch (error) {
      console.log(error);
    }
	}
  */
  
  
  	/* tercer intento concatenando 2 datas */
	
	/* ESTA FORMA FUNCIONA PARA 2 LLAMADAS DATA1 Y DATA2
handleOnClick(id) {
var data1;
 console.log(id);
    fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/')
      .then(res => res.json())
      .then(data => {
	  
			data1 = data;
			fetch('https://pokeapi.co/api/v2/evolution-chain/'+id+'/')
				.then(res => res.json())
					.then(data => {
					
					// modo jquery datacompleta = $.extend(data1, data);
					//datacompleta = data1.concat(data);
					
					
					var datacompleta = {
  data1,
  data
};

 console.log(datacompleta);
					const pokemon = new Pokemon(datacompleta);

					console.log(pokemon);
					this.setState({ pokemon });
       
	   })
      .catch(err => console.log(err)); 
	   
	   
      })
      .catch(err => console.log(err));
  }
  */
  
  
  
  
  
  /* CUARTO INTENTO CON 3 DATAS 	"evolution_chain": { "url": "https://pokeapi.co/api/v2/evolution-chain/1/"*/
  
  // IMPORTANTE CACHEAR porque al api está saturada debido a pokemon go
handleOnClick(id) {

var url_evolucion
var data0;

 console.log(id);
    fetch('https://pokeapi.co/api/v2/pokemon-species/'+id+'/', {cache: 'force-cache'})
	
	
      .then(res => res.json())
      .then(data => {
      
	  data0 = data;
	  url_evolucion = data.evolution_chain.url;
       
	   
	   
	   
	   var data1;
 console.log(id);
    fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/')
      .then(res => res.json())
      .then(data => {
	  
			data1 = data;
			fetch(url_evolucion)
				.then(res => res.json())
					.then(data => {
					
					// modo jquery datacompleta = $.extend(data1, data);
					//datacompleta = data1.concat(data);
					
					
					var datacompleta = {
  data1,
  data,
  data0
};

 console.log(datacompleta);
					const pokemon = new Pokemon(datacompleta);

					console.log(pokemon);
					this.setState({ pokemon });
       
	   })
      .catch(err => console.log(err)); 
	   
	   
      })
      .catch(err => console.log(err));
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
      })
      .catch(err => console.log(err));
  
  }
  
  
  
  
  
  
  
  render() {
    return (
	<div>
		<Cabecera>Pokebridge nacional</Cabecera>
		<div className='buscador-wrapper'>
			<SearchBar onResults={this._handleResults} />
		</div>
		{this.state.databuscador.length === 0 
		? <p>Sin resultados</p> 
		: <p>Con resutlados</p>
		}
		<div className="App">
	 
			<PokeList handleOnClick={this.handleOnClick} />
		    <DetailView pokemon={this.state.pokemon} />
		</div>
	 </div>
    );
  }
}

export default App;