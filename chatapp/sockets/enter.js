'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('enterUserEvent', function (userName) {
        // 入室しましたメッセージ
        const message = userName + 'さんが入室しました。';
        io.sockets.emit("receiveMessageEvent", message);
        console.log(userName + 'さんが入室しました。');

        //入室したタイミングでログインユーザの各種情報を登録
        global.userState.push({
            USERNAME:userName,
            HINTCOUNT:0,
            POINTSUM:0
        });
    });
};
