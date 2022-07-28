import React from 'react';
import './PokemonMoreDetails.css'


export default function PokemonMoreDetails({closeModal,pokemonsDetails,index}){
    // console.log(pokemonsDetails);
    const TopThreeElement = pokemonsDetails.stats.slice(0,3);
    const LastThreeElement = pokemonsDetails.stats.slice(3,6);
    const ColorsArray={
        "normal":   '#A8A77A',
        "fire":   '#EE8130',
        "water":   '#6390F0',
        "electric":   '#F7D02C',
        "grass":   '#7AC74C',
        "ice":   '#96D9D6',
        "fighting":   '#C22E28',
        "poison":  '#A33EA1',
        "ground":   '#E2BF65',
        "flying":   '#A98FF3',
        "psychic":   '#F95587',
        "bug":   '#A6B91A',
        "rock":   '#B6A136',
        "ghost":   '#735797',
        "dragon":   '#6F35FC',
        "dark":   '#705746',
        "steel":   '#B7B7CE',
        "fairy":   '#D685AD',
    }
    var sum=0;
    function CalculateTotal(){
        pokemonsDetails.stats.forEach(element => {sum+=element.base_stat});
        return sum;
    }
  

    return(
        <div id="AllPokemonsDetailsContainer">
            <button id="close" onClick={() => {closeModal(false);}}>X</button>
            <div id="PokemonsDetailsContainer">
                <div id="SomeDetailsContainer">
                    <p id="Number">#0{index}</p>
                    <img id="pokemonImg" src={pokemonsDetails.pic_url} alt="pokemon img" />
                    <p id="pokName">{pokemonsDetails.name}</p>
                    <div id="btns">
                      {pokemonsDetails.type.map((element) =>
                            <button style={{background: ColorsArray[element.type.name]}} id="btn">{element.type.name}</button>
                           )}
                    </div>
                </div>
                <hr id="horizontalLine"/>
                <div id="DescriptionAndStatsContainer">
                    <div id="description"> 
                         <h1 id="desc">description</h1>
                         <p id="desccontent">{pokemonsDetails.description = 'A Strange seed was planted on its back at birth. The plant sprouts and grows with this Pokemon.'}</p>
                    </div>

                    <br /><br /><br /><br />
                    <h1 id="descstat">stats</h1>
                    <br />
                         <div id="stats">
                            <div class="statsDiv">
                                {TopThreeElement.map((element) =>
                                        <p id="firstStat">{element.stat.name} : {element.base_stat}</p> 
                                )}
                            </div>
                            <div class="statsDiv">
                                {LastThreeElement.map((element) =>
                                        <p id="secStat">{element.stat.name} : {element.base_stat}</p> 
                                )}
                            </div>
                            <p class="statsDiv">total: {CalculateTotal()}</p>
                        </div>
                    </div>
                </div>
            </div>

    );
}