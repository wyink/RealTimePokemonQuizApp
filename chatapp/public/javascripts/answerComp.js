'use strict';

// 解答を送信する
function answerComp(){
    /*
    //フロント側の画像からpokeIdを取得する
    =>フロントから取得せず、バックで'global.nowPokeId'で保持する.
    const answerPokesrc = $('#Question > .question').children('.poke-img').attr('src');
    const regex = /^https.+\/(\d+)\.png$/;
    const answerPokeId = (answerPokesrc.match(regex))[1];
    */

    //ユーザー入力の解答を送信する
    const userName = $('#userName').val();
    const userAnswer = $('#message').val() ;
    socket.emit('sendAnswer',[userName,userAnswer]);
    return false;
}

//各ユーザの総合ポイントの反映
socket.on('receiveUpdatePointsum',function(data){
    const userName = data.USERNAME;
    const point = data.POINTSUM;
    $(`#${userName} > .po`).text(point);
})

socket.on('receiveAnswer', function (judge) {
    let display = judge ? "正解" : "不正解"; //正解/不正解
    const color = judge ? "red" : "blue";
    const userName = $('#userName').val();

    if(judge) {
        // 新しい問題の要求
        socket.emit("fetchPokeApiRequestEvent");


    }
    else alert("不正解です。もう一度入力してください");

    //テキストエリアをクリアする
    $('#message').val('');

    const resultData = {
        display: display,
        color: color,
        respondent: userName,
        judge: judge,
        pokeName: ""
    };

    // 回答の結果をみんなに反映するようにリクエスト
    socket.emit("requestUpdateResult", resultData);

});

// 回答結果の反映
socket.on("updateResultEvent", function(resultData) {
    const respondent = resultData.respondent;
    const color = resultData.color;
    const display = resultData.display;
    const judge = resultData.judge;
    const pokeName = resultData.pokeName;
    // 正解の場合の処理
    if(judge) {
        // 正解のポケモンを表示する
        $('#thread').prepend(`<p>正解は「<font color=${color}>${pokeName}</font>」です。</p>`);
        // ヒントを消す
        $('.addHintText').remove();
        $('.hintText').remove();
    }
    $('#thread').prepend(`<p> ${respondent}さんが<font color=${color}>${display}</font>しました。</p>`);

});

