'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $("#userName").val();

    // ユーザ名が未入力でないかチェックする
    if (!userName) {
        alert("ユーザ名を入力してください");
    }
    else {
        //ユーザ名がすでに使用されているかチェックする
        socket.emit('checkUserName',userName);
        socket.on('receiveUserName',function(isUsed){
            if(isUsed){
                alert("すでに使用されている名前です");
            }else{
                $('form').submit();
            }
        })
        
    }

}
