'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function(request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function(request, response, next) {
    const userName = request.body.userName;
    console.log('ユーザ名：' + userName);
    //ユーザ名がすでに使用されているかどうかをチェック
    for(let col of global.userState){
        if(col.USERNAME == userName){
            response.render('index',{
                isUsed:true
            });
        }
    }

    response.render('room', { userName: userName });
});

module.exports = router;
