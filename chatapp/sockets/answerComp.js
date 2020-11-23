const webclient = require('request');

'use strict';

//解答の答え合わせ
module.exports = function(socket, io){

    socket.on('sendAnswer',function([userName,userAnswer]){

        const pokeId = global.nowPokeId;

        //出題ソースと同じAPIにアクセスして丸ごとデータを取得
        const options = {
            url: `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`,
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        //ユーザー入力データの確認を行う関数
        function validateUserAnswer(userAnswer_){

            //解答の前後に含まれる空白（スペース）、改行は取り除く
            const regex1 = /^\s+|\s+$|^\r\n|\r\n$/g ;
            if(userAnswer_.match(regex1) != null){
                userAnswer_ = userAnswer_.replace(regex1,''); //前後の空白・改行を省く）
            }
            
            //平仮名の場合はカタカナに変換する
            const regex2 = /[\u3041-\u3096]/g; 
            if(userAnswer_.match(regex2) != null){
                userAnswer_ = userAnswer_.replace(regex2, ch =>
                    String.fromCharCode(ch.charCodeAt(0) + 0x60)
                );    
            }

            return userAnswer_;
        }
        
        webclient(options, (error, response, body)=>{
            const pokeInfo = JSON.parse(response.body);

            //入力と解答が一致するかどうかの確認
            console.log(pokeInfo.names[0].name);
            const truePokeName = pokeInfo.names[0].name;

            //ユーザー入力データの確認
            userAnswer = validateUserAnswer(userAnswer);

            let judge = false; //正解していた場合はtrue,不正解はfalse
            if(truePokeName == userAnswer){
                judge = true;
                //ポイントを加算
                for(let col of global.userState){
                    if(col.USERNAME == userName){
                        (col.POINTSUM)++;
                        io.sockets.emit('receiveUpdatePointsum',col);
                        break;
                    }
                }
            }else{
                judge = false;
            }

            // 判定結果を回答者に返す
            socket.emit("receiveAnswer", judge);

        });

    });

    // 回答者から回答結果の反映をするためのリクエストを待つ
    socket.on("requestUpdateResult", function(resultData) {
        // 正解だった場合はポケモンの名前を書く
        if (resultData.judge) {
            const pokeId = prePokeId;

            const options = {
                url: `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`,
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            };

            webclient(options, (error, response, body)=>{
                const pokeInfo = JSON.parse(response.body);
                // 正解のポケモンの情報を更新
                resultData.pokeName = pokeInfo.names[0].name;
                // 参加者全員に回答結果の反映をするための情報を送る
                io.sockets.emit("updateResultEvent", resultData);
            });
        } else {
            io.sockets.emit("updateResultEvent", resultData);
        }
    });

};
