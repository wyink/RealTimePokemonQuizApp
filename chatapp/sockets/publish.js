'use strict';


//投稿ボタンは現段階では使用しない。
module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendContentEvent', function (data) {
        console.log(data);
        io.sockets.emit('receiveContentEvent',data);
    });
};


