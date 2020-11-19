'use strict';
// let PokeImgData = "";
const pokemonJsonUrl = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/";
let genreIn = '';
let firstName = '';
let nameLength = '';
let questinCheck = true;
let hintCheck = true;
let addHintCheck = true;

function startQuestion() {
    if(questinCheck){
        const hintButton = `<input type="button" value="Please Hint!" id='hintbtn' class="btn btn-info common-button" onclick="hint();">`
        $('.quizStart').append(hintButton);
        requestQuestion();
        questinCheck = false;
    }
};

function requestQuestion() {
    console.log("start question.js");
    // 投稿内容を送信
    socket.emit('fetchPokeApiRequestEvent');
    return false;
}

socket.on('receivePokeApiData', function (data) {
    console.log(data);

    //APIからの情報取得
    // $('#thread').prepend(PokeId = data.id);
    const pokeId = data.id;
    console.log("pokeId", pokeId);

    //ヒントとしてジャンルを取得
    genreIn = data.genera[0].genus;
    console.log("genre", genreIn);

    //追加ヒント
    nameLength = data.names[0].name;
    firstName = data.names[0].name.slice(0,1);
    console.log("name", firstName);
    console.log("number", nameLength.length);

    //ゼロパディング処理
    let ret = ( '000' + pokeId ).slice( -3 );
    console.log("ret:", ret);

    const pokeImgUrl = pokemonJsonUrl + String(ret) + ".png";
    console.log(pokeImgUrl);

    const questionArea = `<div class='question'><img class='poke-img' src='${pokeImgUrl}' alt='' ></div>` ;

    //問題の表示
    $('#Question > .question').replaceWith(questionArea);　//問題表示エリアに表示
    $('#thread').prepend(questionArea);　     //スレッド部分に表示
});

function hint(){
    if(hintCheck){
        console.log(genreIn);
        const hintArea = `<p class="hintText">このポケモンの属性は「${genreIn}」です！</p>`;
        $('#QuestionSentence').append(hintArea);
        const addhintButton = `<input type="button" value="Please Add Hint!" id='hintbtn' class="btn btn-info common-button" onclick="addHint();">`
        $('.quizStart').append(addhintButton);
        hintCheck = false;
        return false;
    }else{
        $('.hintText').remove();
        hintCheck = true;
    }
}

function addHint(){
    if(addHintCheck){
        console.log(nameLength);
        console.log(firstName);
        const addHintArea = `<p class="addHintText">このポケモンは${nameLength.length}文字で、最初の文字は「${firstName}」です！</p>`;
        $('#QuestionSentence').append(addHintArea);
        addHintCheck = false;
        return false;
    }else{
        $('.addHintText').remove();
        addHintCheck = true;
    }
};