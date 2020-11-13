'use strict';
// let PokeImgData = "";
const pokemonJsonUrl = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/";


function question() {
    console.log("start question.js");
    // 投稿内容を送信
    socket.emit('fetchPokeApiRequestEvent');

    socket.on('receivePokeApiData', function (data) {
        console.log(data);

        //APIからの情報取得
        // $('#thread').prepend(PokeId = data.id);
        const pokeId = data.id;
        console.log("pokeId", pokeId);

        //ゼロパディング処理
        let ret = ( '000' + pokeId ).slice( -3 );
        console.log("ret:", ret);

        const pokeImgUrl = pokemonJsonUrl + String(ret) + ".png";
        console.log(pokeImgUrl);

        const questionArea = "<div class='question'><img class='poke-img' src='" + pokeImgUrl + "' alt='' ></div>"
        //問題の表示
        $('#thread').prepend(questionArea);
    });

    return false;
}

// socket.on('receivePokeApiData', function (data) {
//     console.log(data);

//     //APIからの情報取得
//     // $('#thread').prepend(PokeId = data.id);
//     const pokeId = data.id;
//     console.log("pokeId", pokeId);

//     //ゼロパディング処理
//     let ret = ( '000' + pokeId ).slice( -3 );
//     console.log("ret:", ret);

//     const pokeImgUrl = pokemonJsonUrl + String(ret) + ".png";
//     console.log(pokeImgUrl);

//     const questionArea = "<div><img class='poke-img' src='" + pokeImgUrl + "' alt='' ></div>"
//     //問題の表示
//     $('#thread').prepend(questionArea);
//     console.log("add img");
// });

