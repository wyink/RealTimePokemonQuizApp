'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('enterUserEvent', function (data) {

        // 入室しましたメッセージ
        socket.emit('receiveMessageEvent', data);
    });
};
