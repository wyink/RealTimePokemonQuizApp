const webclient = require("request");

'use strict';

module.exports = function (socket, io) {

    socket.on('fetchPokeApiRequestEvent', function () {
        console.log("start fetch poke data");
        // pokeIdをランダムに生成
        const pokeId = Math.floor(Math.random() * 809);
        console.log(`pokeId: ${pokeId}`);

        // グローバル変数に今問題にしているポケモンIDを記録
        nowPokeId = pokeId;
        // 問題がスタートしたことを記録
        startedQuestion = true;

        const options = {
            url: `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`,
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        webclient(options, (error, response, body)=>{
            const pokeInfo = JSON.parse(response.body);
            // console.log(pokeInfo);
            console.log(pokeInfo.names[0].name);
            // フロント側にデータを送信
            io.sockets.emit('receivePokeApiData', pokeInfo);
            console.log("complete send pokeInfo");
        });
    });

    socket.on("checkStartedQuiz", function() {
        let started = false;
        if (startedQuestion) {
            console.log("既にクイズは始まっています");
            started = true;
        }
        else {
            console.log("まだ始まってません。");
            started = false;
        }
        socket.emit("returnStartedFlag", started);
    });

    socket.on("requestNowQuestion", function() {
        const pokeId = nowPokeId;

        const options = {
            url: `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`,
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        webclient(options, (error, response, body)=>{
            const pokeInfo = JSON.parse(response.body);
            // console.log(pokeInfo);
            console.log(pokeInfo.names[0].name);
            // フロント側にデータを送信
            socket.emit('receivePokeApiData', pokeInfo);
            console.log("complete send pokeInfo");
        });

    });

    return false


};


