import React, { Component } from 'react';
import PokeList from './PokeList';
import DetailView from './DetailView';
import { SearchBar } from './SearchBar';
import Pokemon from './Pokemon';
import './styles/App.css';
import 'bulma/css/bulma.css';
//import { ocultar } from './pokemon1.js';
import { Cabecera } from './cabecera';
import ReactDOM from 'react-dom';


class App extends Component {

  constructor() {
    super();

    this.state = {
      pokemon: {},
      databuscador: [],
      data: [],
      term: '',
    };

     this._handleResults = this._handleResults.bind(this);
   //this._handleChange = this._handleChange.bind(this);
	   this.handleTermChange = this.handleTermChange.bind(this);
     this.handleOnClick = this.handleOnClick.bind(this);
  	 this.handleLoad = this.handleLoad.bind(this);
     this._renderResults = this._renderResults.bind(this);

  }

  state = { databuscador: [] }

  handleTermChangefunciona(term) {
    //aquí recibimos correctamente la búsqueda en directo, caracter a caracter
    //Hay que tener en cuenta que hacer peticiones por cada carácter colapsaría la pokeapi
    //que admite como máximo 100 peticiones al día, con tiempo añadir caché

       console.log(term);
   }


   handleTermChange = (term) => {
    this.setState({ term: [term] })
    //console.log(term);
    }


   _handleResults = (databuscador) => {
    this.setState({ databuscador: [databuscador] })
    }

/*No se utiliza ya
    _handleChange = (term) => {
     this.setState({ term })
       console.log("hola2");
     }
     */

    _renderResults() {
      const { databuscador } = this.state
      const { term } = this.state
      var paso = 0;
      //prueba  const  numbers  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      console.log(databuscador[0].name)

      /* Bucle de comprobación
        for (paso = 0; paso < 20; paso++) {
          console.log(databuscador[0].indexOf("bulbasaur"));
        };
        */

        //console.log(databuscador.name.indexOf("bulbasaur"));

        return databuscador[0]
        .map((pokemonlist, i) => {

            //Si alguno de los nombres coincide con el término de búsqueda mostramos ese pokemon solo
             if ((pokemonlist.name) === (String(term)))
             {

               window.ocultar(i);

               for (paso = 0; paso < 150; paso++) {
                 console.log(paso);

                // window.document.getElementById(paso).style.display = 'none';
                // ReactDOM.render(document.getElementById(3).style.display = 'none');
              //  document.getElementById(i).style.display = 'none';*/
            };

               if ((String(term)) === "aa")
               {
                  console.log("funciona");
               }

               console.log(String(term));
               //hacer un for de 0 a 150 con un getElementById display none y luego
               // un getElementById con la id {i} con display block

               return  <div>
              <p id={i} key={i}></p>
               </div>

             }



           }
         )
       }



//Comprobamos que se ha cargado el dom
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);


 }

//Cambios que podemos hacer al iniciar la app
handleLoad() {


// Ya no hace falta, servia para importar js externos
/*  const script = document.createElement("script");
    script.src = "./pokemon1.js";
    script.async = true;
    document.body.appendChild(script);
*/




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


  // IMPORTANTE CACHEAR porque la api está saturada debido a pokemon go
  //Función para tratar los clicks sobre cada pokemon
  //Para recoger toda la información solicitada, nombre, tipo, pre-evolución y evolución hace falta hacer 3 llamadas a la api
handleOnClick(id) {
var url_evolucion
var data0;

 console.log(id);
    fetch('https://pokeapi.co/api/v2/pokemon-species/'+id+'/', {cache: 'force-cache'})
      .then(res => res.json())
      .then(data => {
        data0 = data; //guardamos el primer fetch
	      url_evolucion = data.evolution_chain.url; //conseguimos la url de la cadena evolutiva de este pokemon

	       var data1;
         console.log(id);
         fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/')
         .then(res => res.json())
         .then(data => {
			        data1 = data; //guardamos la información del segundo fetch
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
        			<SearchBar onChange={this.handleTermChange} onResults={this._handleResults} />

        		{

              this.state.databuscador.length < 1
        		? <p></p>
        		: this._renderResults()
        		}
    	</div>
		<div className="App">

			  <PokeList handleOnClick={this.handleOnClick} />
		    <DetailView pokemon={this.state.pokemon} />
		</div>
	 </div>
    );
  }
}

export default App;
