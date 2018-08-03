import React, {Component} from 'react';

export class SearchBar extends Component {
state = {
  inputMovie: ''
}

handleChange = (e) => {
this.setState({inputMovie: e.target.value})
//console.log(e.target.value)
//Aquí lo enviamos a la funcion handleTermChange(term) de App.js
this.props.onChange(e.target.value);
}

_handleSubmit = (e) => {
  e.preventDefault()
  //alert(this.state.inputMovie)
  const { inputMovie } = this.state

  fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(res => res.json())
      .then(databuscador => {
	       const {results,count} = databuscador

	        this.props.onResults(results)

          //  console.log(results, count)

      })
      .catch(err => console.log(err));

}


    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }


    render() {
        return (
		<form onSubmit={this._handleSubmit}>
      		<div className="field has-addons">
      			 <div className="control">
      				<input
      				className="input"
      				onChange={this.handleChange.bind(this)}
      				type="text"
      				placeholder="Buscar pokemon" />
      			</div>
      				  <div className="control">
      					<button className="button is-info">
      					Buscar
      					</button>
      			</div>
      		</div>
		</form>
        )
    }
}

//export default SearchBar;

/*
  <div className="search">
                <input onChange={event => this.onInputChange(event.target.value)} />
            </div>
			*/
