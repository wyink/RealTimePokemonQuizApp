'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitMessage', function (data) {
        //退出しましたメッセージ
        socket.broadcast.emit('receiveExitMessage', data);
    });
};
