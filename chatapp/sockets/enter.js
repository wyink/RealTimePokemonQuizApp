'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('enterUserEvent', function (data) {
        // 入室しましたメッセージ
        io.sockets.emit("receiveMessageEvent", data);
        console.log(data);
    });
};
