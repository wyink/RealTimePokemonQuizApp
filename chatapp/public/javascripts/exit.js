'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $("#userName").val();
    // 退室メッセージイベントを送信する
    socket.emit('sendExitMessage', userName);
    //他のユーザのテーブルから自身の情報を削除する
    socket.emit('removeSelfFromTable',userName);
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitMessage', function (userName) {
    $('#thread').prepend('<p>' + userName + 'さんが退出しました。' + '</p>');
});

