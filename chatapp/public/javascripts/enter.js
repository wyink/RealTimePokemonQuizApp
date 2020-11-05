'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $("#userName").val();
console.log("ユーザ名は。。。。。。", userName);

// 入室メッセージイベントを送信する
socket.emit('enterUserEvent', userName + 'さんが入室しました。');

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
});
