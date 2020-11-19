'use strict';

// 解答を送信する
function answerComp(){
    const answer = $('#message').val() ;
    const answerPokesrc = $('#Question > .question').children('.poke-img').attr('src');
    const regex = /^https.+\/(\d+)\.png$/;
    const answerPokeId = (answerPokesrc.match(regex))[1];
    socket.emit('sendAnswer',{
        ANSWER:answer,
        ANSID:answerPokeId
    });
    return false;
}

socket.on('receiveAnswer', function (judge) {
    let display = ''; //正解/不正解
    let color = "red";
    if(judge){
        //次の問題へと進む
        display = "正解";
        color = "red";
        requestQuestion();
    }else{
        //もういちど解答を入力するよう促す
        display = "不正解";
        color = "blue";
        alert("不正解です。もう一度入力してください");
    }

    //テキストエリアをクリアする
    $('#message').val('');

    const userName = $('#userName').val();
    $('#thread').prepend(`<p> ${userName}さんが<font color=${color}>${display}</font>しました。</p>`);
});


