const webclient = require('request');

'use strict';

//解答の答え合わせ
module.exports = function(socket, io){

    socket.on('sendAnswer',function(data){
        //解答ファイルの読み込み（pokemon.json)
        const options = {
            url: 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json',
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };
        webclient(options, (error, response, body)=>{
            const pokeJson = JSON.parse(response.body);
            // フロント側にデータを送信
            let judge = false; //正解していた場合はtrue,不正解はfalse
            for(let poke of pokeJson){
                if(poke.id == data.ANSID){
                    if(data.ANSWER==poke.name.japanese){
                        judge = true;
                    }else{
                        judge = false;
                    } 
                    break;
                }
            }
            io.sockets.emit('receiveAnswer',judge);    
        });
    });
};
