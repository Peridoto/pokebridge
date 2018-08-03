class Pokemon {
  constructor(data) {
    this.id = data.data1.id;
    this.name = data.data1.name;
    this.sprite = data.data1.sprites.front_default;
    this.type = data.data1.types[0].type.name;
	this.evolves_from_species = String(data.data0.evolves_from_species);
	
	
	if (this.evolves_from_species ==="null")
	{
	this.evolves_from_species = "Pokémon base";
	
	
	
	try{
	this.evolves_to = String(data.data.chain.evolves_to[0].species.name);
	}
	catch(err1)
	{
	this.evolves_to = "No evoluciona";
	}
	
	
	
	
	}
	else
	{
	this.evolves_from_species = String(data.data0.evolves_from_species.name);
	
	try{
	if ( String(data.data.chain.evolves_to[0].evolves_to[0].species.name) === this.name)
	{
	this.evolves_to = "No evoluciona";
	}
	else
	{
	this.evolves_to = String(data.data.chain.evolves_to[0].evolves_to[0].species.name);
	}
	}
	catch(err)
	{
	this.evolves_to = "No evoluciona";
	}
	
	}
	
	
	
	
	
	//this.evolves_to = data.chain.evolves_to[0].evolution_details[0].min_level;
	//this.evolves_to = "ivy";
  }
}

export default Pokemon;