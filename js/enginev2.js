$(document).ready(function(){

});

window.ev = false;
window.gm = false;

// Get a reference to the database service
var database = firebase.database();

document.getElementById('start_btn').onclick = function () {
    window.gm = true
    letsCountIt(0,s);
}

window.letsCountIt = function (cdtimer, rng) {
    ++cdtimer;
    if (rng == cdtimer) {
        window.gm = false;
    }
    document.getElementById('point_c').innerHTML = cdtimer;
    if (!window.gm) {
        if (rng = cdtimer) {
            alert ("you lost u fuking noob")
        } else {
            alert("game done! You scored " + (cdtimer) + " out of " + rng)
        }
    } else {
        setTimeout(function(){letsCountIt(cdtimer, rng);}, 100);
    }
}

document.getElementById('plat_id').onclick = function () {
    if (window.gm) {
        window.gm = false;
    }
}

function serverSync() {
    var g = firebase.database().ref('status/');
    g.on('child_changed', function(snapshot) {
        var b = snapshot.val();
        console.log(b)
        if (b == true) {
            firebase.database().ref('/lobby').once('value').then(function (snapshot) {
                var r = snapshot.val().id;
                console.log(r)
                // ...
            })
        }
    });
}
serverSync()