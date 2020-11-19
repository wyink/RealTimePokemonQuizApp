const webclient = require('request');

'use strict';

//解答の答え合わせ
module.exports = function(socket, io){

    socket.on('sendAnswer',function(data){
        
        const pokeId = data.ANSID ;

        //出題ソースと同じAPIにアクセスして丸ごとデータを取得
        const options = {
            url: `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`,
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        webclient(options, (error, response, body)=>{
            const pokeInfo = JSON.parse(response.body);

            //入力と解答が一致するかどうかの確認
            console.log(pokeInfo.names[0].name);
            const truePokeName = pokeInfo.names[0].name;

            let judge = false; //正解していた場合はtrue,不正解はfalse
            if(truePokeName == data.ANSWER){
                judge = true;
            }else{
                judge = false;
            }

            // フロント側にデータを送信
            io.sockets.emit('receiveAnswer',judge);

        });

    })

};
