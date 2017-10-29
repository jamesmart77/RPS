// Initialize Firebase
var config = {
    apiKey: "AIzaSyBeUfmcYXZiY1LTrWHhpBrlGv8qlaetAFI",
    authDomain: "rps-multiplayer-e6c3b.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-e6c3b.firebaseio.com",
    projectId: "rps-multiplayer-e6c3b",
    storageBucket: "",
    messagingSenderId: "1082800212245"
};
firebase.initializeApp(config);
var database = firebase.database();

//----------------------------------------------
//POST MESSAGES AREA
//----------------------------------------------
var messagesRef = database.ref("/messages");

function postMessage() {

    var messageText = $("#message").val();

    database.ref("/messages").push({
        playerName: "James",
        messageText: messageText,
        postTime: moment().format("MM-DD-YY, h:mm:ss a")
    });

}

//listening for any new messages posted
//will auto load when page loads
messagesRef.on("child_added", function (snapshot) {

    let container = $("#posted");
    let messageDiv = $("<div>");
    let player = snapshot.val().playerName;
    let message = snapshot.val().messageText;
    let postTime = snapshot.val().postTime;

    messageDiv.html("<b>"+player+"</b><small> " + postTime + "</small>: " + message);

    container.append(messageDiv);
    container.scrollTop(container.prop("scrollHeight"));
    $("#message").val("");
})
//----------------------------------------------
//----------------------------------------------