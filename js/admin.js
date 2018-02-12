function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createGameDb(z) {
    var s =  getRandomInt(200) + 200
    if (z == true) {
        database.ref('lobby').set({
            host: "admin",
            id: s
        });
        database.ref('status').set({
            game: z
        });
    } else {
        database.ref('status').set({
            game: z
        });
    }
}




window.gameRunner = function () {
    createGameDb(false)
    setTimeout(function(){createGameDb(true);}, 5000)
    setTimeout(function(){gameRunner();}, 60000)
}

gameRunner()