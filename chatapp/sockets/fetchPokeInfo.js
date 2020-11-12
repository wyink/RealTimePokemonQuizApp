const webclient = require("request");

// pokeIdをランダムに生成
const pokeId = Math.floor(Math.random() * 809);
console.log(`pokeId: ${pokeId}`);

const options = {
    url: `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`,
    method: "GET",
    headers: {
        "content-type": "application/json"
    }
};

webclient(options, (error, response, body)=>{
    const pokeInfo = JSON.parse(response.body);
    console.log(pokeInfo.names[0].name);
    console.log(pokeInfo);
    return pokeInfo;
})

