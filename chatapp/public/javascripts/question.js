'use strict';
// let PokeImgData = "";
const pokemonJsonUrl = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/";
let genreIn = '';
let questinCheck = true;
let hintCheck = true;

function startQuestion() {
    if(questinCheck){
        const hintButton = `<input type="button" value="Please Hint!" id='hintbtn' class="btn btn-info common-button" onclick="hint();">`
        $('.quizStart').append(hintButton);
        requestQuestion()
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
        hintCheck = false
        return false;
    }else{
        $('.hintText').remove();
        hintCheck = true;
    }
}