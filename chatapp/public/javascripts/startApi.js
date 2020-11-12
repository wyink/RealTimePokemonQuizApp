
'use strict';

const data = [];

function fetchPokeInfo() {
    fetch('https://pokeapi.co/api/v2/pokemon-species/1').then(res => res.json())
        .then(result => {
            console.log(result);
        })
}
