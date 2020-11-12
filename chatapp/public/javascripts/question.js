let PokeImgData = "";

socket.on('receiveApiData', function (data) {
    // pokeIdの取得
    const pokeId = data.id;
    //APIからの情報取得
    $('#thread').prepend(pokeId);
    //ゼロパディング処理
    let ret = ( '000' + pokeId ).slice( -3 );
    //imgタグを表示
    $('.class').apend("<img class='poke_img' src='../../public/pokemon.json/" + String(ret) + ".png' alt='' >"); //画像のパスの指定は勝手にやっちゃいました。すいません。byすぎ
});

