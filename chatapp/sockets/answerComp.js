const fs = require('fs');
const path = require('path');

'use strict';

//解答の答え合わせ
module.exports = function(socket, io){

    socket.on('sendAnswer',function(data){
        //解答ファイルの読み込み（pokemon.json)
        const pokeJsonFile = path.join(__dirname,'..','public/pokemon.json/pokedex.json');
        const pokeJson = JSON.parse(fs.readFileSync(pokeJsonFile,'utf8'));
        
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

};
