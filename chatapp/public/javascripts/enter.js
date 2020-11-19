'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $("#userName").val();

// 入室メッセージイベントを送信する
socket.emit('enterUserEvent', userName + 'さんが入室しました。');
socket.emit("checkStartedQuiz");

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
});

socket.on("returnStartedFlag", function(data) {
    if (data) {
        console.log("既にクイズが始まっているので、要求します。");
        socket.emit("requestNowQuestion");
    }
    else {
        console.log("まだ始まってません。");
    }
});