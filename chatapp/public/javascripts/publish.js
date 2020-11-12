'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    console.log(userName);
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿内容を送信
    socket.emit('sendContentEvent',{
        UN:userName,
        MS:message
    });
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveContentEvent', function (data) {
    console.log("abcdefg");
    $('#thread').prepend('<p>' + `${data.UN}:${data.MS}` + '</p>');
});
