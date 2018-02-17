window.pw = 0;
window.ph = 0;
window.ev = false;
window.gm = false;
window.ig = false;
$(document).ready(function(){
    window.ph = $('#plat_id').height();
    window.pw = $('#plat_id').width();
});





// Get a reference to the database service
var database = firebase.database();

document.getElementById('start_btn').onclick = function () {
    window.ig = true
    notProgress(true)
}



window.letsCountIt = function (cdtimer, rng) {
    ++cdtimer;
    if (rng == cdtimer) {
        window.ig = false
    }
    document.getElementById('point_c').innerHTML = cdtimer;
    if (!window.ig) {
        if (rng == cdtimer) {
            notFailed()
        } else {
            console.log("game done! You scored " + (cdtimer) + " out of " + rng)
            notSucccess(cdtimer)
        }
    } else {
        setTimeout(function(){letsCountIt(cdtimer, rng);}, 100);
    }
}

document.getElementById('plat_id').onclick = function () {
    if (window.ig) {
        window.ig = false;
    }
}

function serverSync() {
    var g = firebase.database().ref('status/');
    g.on('child_changed', function(snapshot) {
        var b = snapshot.val();
        document.getElementById('status_i').style.color = 'red';

        if (b == true && window.ig) {
            ressP()
            window.gm = true
            document.getElementById('status_i').style.color = 'green';
            firebase.database().ref('/lobby').once('value').then(function (snapshot) {
                var r = snapshot.val().id;
                letsCountIt(0,r);
                notLive()
                destroyP(r*100)
                // ...
            })
        } else {
            document.getElementById('status_i').style.color = 'yellow';
            notProgress(false);
        }
    });
}
serverSync()

function notSucccess(v) {
    document.getElementById('not_id').innerHTML = "<strong>Congrats!</strong> You scored " + v + " points."
    document.getElementById("not_id").classList.add('alert-success');
    document.getElementById("not_id").classList.remove('alert-danger');
    document.getElementById("not_id").classList.remove('alert-warning');
}

function notFailed() {
    document.getElementById('not_id').innerHTML = "<strong>BURNED!</strong> You died like a noob!";
    document.getElementById("not_id").classList.remove('alert-success');
    document.getElementById("not_id").classList.add('alert-danger');
    document.getElementById("not_id").classList.remove('alert-warning');
}

function notProgress(t) {
    if (t) {
        document.getElementById('not_id').innerHTML = "<strong>Chilling</strong> You are in a queue";
    } else {
        document.getElementById('not_id').innerHTML = "<strong>Chilling</strong> Press 'Play' to join the game";
    }
    document.getElementById("not_id").classList.remove('alert-success');
    document.getElementById("not_id").classList.remove('alert-danger');
    document.getElementById("not_id").classList.add('alert-warning');
}

function notLive() {
    document.getElementById('not_id').innerHTML = "<strong>PANIC</strong> Be the last one to jump off the cliff!";
    document.getElementById("not_id").classList.remove('alert-success');
    document.getElementById("not_id").classList.remove('alert-danger');
    document.getElementById("not_id").classList.add('alert-warning');
}

function destroyP(t) {
    $('#plat_id').animate({ width: 0, height: 0 }, t,   function(){});
}

function ressP(){
    $('#plat_id').animate({ width: window.pw, height: window.ph }, 1000,   function(){});
}