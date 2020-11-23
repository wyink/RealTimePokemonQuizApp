'use strict';
// let PokeImgData = "";
const pokemonJsonUrl = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/";
let genreIn = '';
let firstName = '';
let nameLength = '';
// let questinCheck = true;
let hintCheck = true;
let addHintCheck = true;

socket.on('receivePokeApiData', function (data) {
    console.log(data);

    //APIからの情報取得
    const pokeId = data.id;
    // console.log("pokeId", pokeId);

    //ヒントとしてジャンルを取得
    genreIn = data.genera[0].genus;
    // console.log("genre", genreIn);

    //追加ヒント
    nameLength = data.names[0].name;
    firstName = data.names[0].name.slice(0,1);
    // console.log("name", firstName);
    // console.log("number", nameLength.length);

    //ゼロパディング処理
    let ret = ( '000' + pokeId ).slice( -3 );
    // console.log("ret:", ret);

    const pokeImgUrl = pokemonJsonUrl + String(ret) + ".png";
    // console.log(pokeImgUrl);

    const questionArea = `<div class='question'><img class='poke-img' src='${pokeImgUrl}' alt='' ></div>` ;
    const displayArea = `<div class='question'><img class='poke-display-img' src='${pokeImgUrl}' alt='' ></div>` ;

    //問題の表示
    $('#Question > .question').replaceWith(displayArea);　//問題表示エリアに表示
    $('#thread').prepend(questionArea);　     //スレッド部分に表示
});

//ヒント使用回数を更新する
function hintCountUpdater(){
    const userName = $('#userName').val();
    socket.emit('updateHintCount',userName);
}

//テーブルの表示を更新する
socket.on('receiveHintCountUpdate',function(selfState){
    /*
    selfState = {
        USERNAME:xxx,
        HINTCOUNT:n,
        POINTSUM:m
    },
    */
   
   //テーブルに登録されている自分のヒント回数を更新する
   console.log("hint" + selfState + selfState.HINTCOUNT);
   //$('#挑戦者 > .hi').text(1);
   const userName = selfState.USERNAME;
   const hintCount = selfState.HINTCOUNT;
   $(`#${userName} > .hi`).text(hintCount);
   
});

function hint(){
    if(hintCheck){
        const hintArea = `<p class="hintText hint-common-text">・このポケモンの属性は「${genreIn}」です！</p>`;
        $('.hint').append(hintArea);
        hintCountUpdater();
    }
    else {
        $('.hintText').remove();
    }
    hintCheck = !hintCheck;
}

function addHint(){
    if(addHintCheck){
        const addHintArea = `<p class="addHintText hint-common-text">・このポケモンは${nameLength.length}文字で、最初の文字は「${firstName}」です！</p>`;
        $('.hint').append(addHintArea);
        hintCountUpdater();
    }else{
        $('.addHintText').remove();
    }
    addHintCheck = !addHintCheck;

};