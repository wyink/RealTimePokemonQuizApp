'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $("#userName").val();
console.log("userName", userName);

// 入室メッセージイベントを送信する
socket.emit('enterUserEvent', userName);

// クイズが既に始まっているかのチェック
socket.emit("checkStartedQuiz");

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (message) {
    $('#thread').prepend('<p>' + message + '</p>');
});

// クイズが始まっているかの結果を受け取り、対応する問題を取得する
socket.on("returnStartedFlag", function(data) {
    if (data) {
        console.log("既にクイズが始まっているので、今の問題を要求します。");
        // 今の問題を取得
        socket.emit("requestNowQuestion");
    }
    else {
        console.log("まだ始まってません。クイズをスタートします。");
        // 新しい問題を取得
        socket.emit('fetchPokeApiRequestEvent');
    }
});