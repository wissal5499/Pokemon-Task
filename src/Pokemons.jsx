import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PokemonMoreDetails from './PokemonMoreDetails.jsx';
import PokeDexImg from './PokeDexImg.jsx';
import './Pokemons.css';
import './PokeDexImg.css';


export default function ParentPokemonComponent(){
    const [get_next_url, setIsLoading] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
    const [pokemonArray,showPokemon] = useState([]);
//    const [FilterdPokemonArray,showfilterPokemon] = useState([]);
    const [openModal,setOpenModal] = useState(false);
    const [pokemonsDetails,ShowPokemonFeatures] = useState('');
    const [pokemonIndex,getPokIndex] = useState(0);
    const [PokemonfilterdArray,showfilteredPokemon] = useState([]);
    const shouldFech = useRef(true);
    const searchText = useRef(null);


    const fetchData = async () => {
        const Pokemon_Data= await fetch(get_next_url).then(response => response.json());
        //console.log(Pokemon_Data);
        setIsLoading(Pokemon_Data.next);
        Pokemon_Data.results.forEach(async pokemon =>
             {
                const pokemon_url = pokemon.url;
                const pokemonsDetails = {"name":' ',"pic_url":' ',"descriotion":'',"stats":[],"type":[]};
                const pokemon_feature = await fetch(pokemon_url).then(response => response.json());

                console.log(pokemon_feature);
                pokemonsDetails.name = pokemon_feature.name;
                pokemonsDetails.pic_url = pokemon_feature.sprites.front_default;
                pokemonsDetails.type = pokemon_feature.types;
                pokemonsDetails.stats = pokemon_feature.stats;

                //console.log(pokemon_feature);

                showPokemon(pokemonArray => [...pokemonArray,pokemonsDetails]);
                showfilteredPokemon(PokemonfilterdArray =>[...PokemonfilterdArray,pokemonsDetails])
             });
    }
    
    function filterPokemons(event){
        const somePokemons = pokemonArray.filter(element => {
            return element.name.includes(searchText.current.value);
        });
        showfilteredPokemon(somePokemons);
        event.preventDefault();
    }
    
    const onBtnClicked = () => {
        fetchData();
    } 

    useEffect(() => {
        try{
            if(shouldFech.current){
                fetchData();
            }
            return () => {
                shouldFech.current = false;
            }
        }
        catch(error){
            console.log(error);
        }
    });
     
        return(
            <div id="container">
                <PokeDexImg />
                <div id="searchDiv">
                   <input type="text" id="searchbox" ref={searchText}/>
                   <button onClick={filterPokemons} id="searchBtn" >search</button>
                </div>
                <br />

                <div id="containerDiv"> 
                     {PokemonfilterdArray.map((element,key) =>
                        <button onClick={ ()=> {setOpenModal(true); ShowPokemonFeatures(element); getPokIndex(key)}}>

                          <div id="pokemonDiv" key = {key} >
                               <p id="key">#0{++key}</p>
                               <img id="pokemonImg" src={element.pic_url} alt="img of pokemon" />
                               <p id="pokName">{element.name}</p>
                           </div>                           

                        </button>
                        
                           )}
                {openModal && <PokemonMoreDetails closeModal={setOpenModal} pokemonsDetails={pokemonsDetails} index={pokemonIndex}/>}
                </div>
                <br /><br />
                
                <div>
                    {<button onClick={onBtnClicked} id="morePokemon">show more</button>}
                </div><br /><br />
            </div>
            );
    }


