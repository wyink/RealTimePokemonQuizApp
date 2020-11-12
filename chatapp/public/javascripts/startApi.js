
'use strict';

const data = [];
const PokeId = "1";

function fetchPokeInfo() {
    //乱数作成関数　1〜893

    //API情報取得
    fetch(`https://pokeapi.co/api/v2/pokemon-species/1`).then(res => res.json())
        .then(result => {
            console.log(result.body);
        })
}
