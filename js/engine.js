$(document).ready(function(){
    animateDiv('.platform');
});

window.ev = false;
window.gm = false;

function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 200;
    var w = $(window).width() - 200;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}

function getNewSpeed(myclass, newpos) {
    var pos = $(myclass).position();
    var d = Math.floor(Math.sqrt(Math.pow(newpos[0]-pos.top,2) + Math.pow(newpos[1]-pos.left,2)));
    return d*10;
}

function animateDiv(myclass){
    var newq = makeNewPosition();
    var speed = getNewSpeed(myclass, newq);
    $(myclass).animate({ top: newq[0], left: newq[1] }, speed,   function(){
        animateDiv(myclass);
    });

};

function startGame() {
    if (window.ev && !window.gm) {
        window.gm = true
        console.log("game started!")
        letsCountIt(0);
    }
}


//----------------------------------------------------------------
$('.platform').on('mousedown', function() {
    timeoutId = setTimeout(mouseCheck, 100);
}).on('mouseup mouseleave', function() {
    clearTimeout(timeoutId);
});

function mouseCheck() {
    console.log("mouseCheck was triggered")
    window.ev = true;
}

document.getElementById('plat_id').onmouseover = function () {
    window.ev = true;
    //console.log(window.ev);
}

document.getElementById('plat_id').onmouseout = function () {
    window.ev = false;
    console.log("(mouse out)")
    if (window.gm){
        window.gm = false
        console.log("game done(mouse out)")
    }
    //console.log(window.ev);
}

document.getElementById('plat_id').onmouseup = function () {
    console.log("(mouse up)")
    if (window.gm){
        window.gm = false
        console.log("game done(mouse up)")
    }
    //console.log(window.ev);
}

document.getElementById('plat_id').onmousedown = function () {
    startGame()
}

window.letsCountIt = function (cdtimer) {
    ++cdtimer;
    document.getElementById('point_c').innerHTML = cdtimer;
    if (!window.gm) {
        if (window.gm === true) {

        } else {

        }
    } else {
        setTimeout(function(){letsCountIt(cdtimer);}, 100);
    }
}


