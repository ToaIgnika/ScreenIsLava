// Initialize Firebase
var config = {
    apiKey: "AIzaSyB9mrIm_Plxi11V-Fxag04BEwkYHvlpsfI",
    authDomain: "screenislava.firebaseapp.com",
    databaseURL: "https://screenislava.firebaseio.com",
    projectId: "screenislava",
    storageBucket: "screenislava.appspot.com",
    messagingSenderId: "462705555627"
};
firebase.initializeApp(config);



function registerUser() {
    var email_var = document.getElementById('email').value
    var pass_var = document.getElementById('pwd').value
    firebase.auth().createUserWithEmailAndPassword(email_var, pass_var).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
    });
}

function signUser() {
    var email_var = document.getElementById('email').value
    var pass_var = document.getElementById('pwd').value
    firebase.auth().signInWithEmailAndPassword(email_var, pass_var).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
    });
}

function signOut() {
    firebase.auth().signOut();
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log("in")
        document.getElementById("log_ui").classList.remove('fa-sign-in');
        document.getElementById("log_ui").classList.add('fa-user');
        document.getElementById("in_mod").style.display = 'none'
        document.getElementById("out_mod").style.display = 'block'
        // ...
    } else {
        // User is signed out.
        console.log("not in")
        document.getElementById("log_ui").classList.add('fa-sign-in');
        document.getElementById("log_ui").classList.remove('fa-user');
        document.getElementById("out_mod").style.display = 'none'
        document.getElementById("in_mod").style.display = 'block'
        // ...
    }
});

function loadList() {
    const listNode = firebase.database().ref('lobby/');
    const bigList = document.getElementById('lobby_list');
    listNode.on('child_added', function(snap) {
        const li = document.createElement("li");
        const aLink = document.createElement("a");
        aLink.setAttribute("value", snap.key);
        aLink.setAttribute("onclick", "loadPost(this)");
        aLink.innerHTML = snap.val().host;
        li.appendChild(aLink);
        bigList.appendChild(li);
    });
}