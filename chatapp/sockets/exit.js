'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitMessage', function (userName) {
        //退出しましたメッセージ
        socket.broadcast.emit('receiveExitMessage', userName);
    });

    // 退出したユーザー情報は他ユーザのテーブルから削除
    socket.on('removeSelfFromTable',function(userName){
        const arlen = global.userState.length;
        for(let i=0;i<arlen;++i){
            if(((global.userState)[i]).USERNAME == userName){
                (global.userState).splice(i,1);
                socket.broadcast.emit('receiveTable',global.userState);
                break;
            }
        }
    });
};
