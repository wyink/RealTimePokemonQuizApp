'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('enterUserEvent', function (userName) {
        // 入室しましたメッセージ
        const message = userName + 'さんが入室しました。';
        io.sockets.emit("receiveMessageEvent", message);
        console.log(userName + 'さんが入室しました。');

    });

    //ログインしているユーザの情報をテーブルに反映
    socket.on('requestTable',function(userName){
        let newUser = {
            USERNAME:userName,
            HINTCOUNT:0,
            POINTSUM:0
        };
        global.userState.push(newUser);
        io.sockets.emit('receiveTable',global.userState);
    });

    //ユーザ名がすでにログインしているユーザに使用されているかどうかをチェック
    socket.on('checkUserName',function(userName){
        let isUsed = false;
        for(let col of global.userState){
            if(col.USERNAME == userName){
                isUsed = true;
            }
        }
        socket.emit('receiveUserName',isUsed);
    });
};
