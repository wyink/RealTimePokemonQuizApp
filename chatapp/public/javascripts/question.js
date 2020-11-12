let PokeImgData = "";

socket.on('receiveApiData', function (data) {
    //APIからの情報取得
    $('#thread').prepend(PokeId = data.id);
    //ゼロパディング処理
    let ret = ( '000' + PokeId ).slice( -3 );
    //imgタグを表示
    PokeImgData.id
    $('.class').apend("<img class='poke_img' src='" +  + "' alt='' >");
});

