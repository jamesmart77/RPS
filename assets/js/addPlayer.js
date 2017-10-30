var playersRef = database.ref("/players");
var connectedRef = database.ref(".info/connected");
var player
var playerCount
var playerQuery = firebase.database().ref("players").orderByKey();
var activePlayers = []

// --------------------------------------------------------------
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (!snap.val()) {

        if (player !== undefined) {
            // Remove user from the connection list when they disconnect.
            player.onDisconnect().remove();
            // player.onDisconnect().set("I disconnected")
        }
    }
});

function addPlayer() {

    //get user name input
    var playerName = $("#playerName").val();

    //add player to database
    playersRef.once("value", function (snapshot) {

        //look at current number of players on app
        playerCount = snapshot.numChildren();
        let playerIndex
        var existingPlayerNum

        //2 players only allowed
        if (playerCount < 2) {
            if (playerCount === 0) {
                // Add user to the connections list.
                playerIndex = 1;

            } else if (playerCount === 1) {

                existingPlayerNum = activePlayers[0];

                //need better way to get existingPlayerNum
                //this will cause issues if one player leaves and one remains and then another user wants to play previously existing user
                if (existingPlayerNum === 1) {
                    playerIndex = 2;
                } else {
                    playerIndex = 1;
                }
            }
            //if player spot is open, add player and assign the next
            //available number (1 or 2)
            player = playersRef.push({
                playerNum: playerIndex,
                playerName: playerName
            });

            // if (playerIndex === 1) {
            //     $(".player1-head").text(playerName);
            // } else {
            //     $(".player2-head").text(playerName);
            // }

            hideFormFields(); //
        } else {
            alert("Sorry, 2 people are already battling. You can join once one person leaves.")
        }
    });

    $("#playerName").val("");
}

playersRef.on("value", function (snapshot) {

    //look at current number of players on app
    playerCount = snapshot.numChildren();
    activePlayers = [];//reset array to get latest

    if (playerCount >= 2) {
        hideFormFields();
    } else {
        $(".input-group").css({
            "display": "table",
            "margin": "0 auto",
            "width": "60%",
            "padding": "0",
            "float": "none"
        });
        $(".game-full").css("display", "none");
    }

    playerQuery.once("value")
        .then(function (snap) {
            snap.forEach(function (childSnapshot) {
                var playerKey = childSnapshot.key;
                var playerNumber = childSnapshot.val().playerNum;
                var playerName = childSnapshot.val().playerName;

                // console.log(playerKey)
                console.log(playerNumber)

                if (playerNumber === 1) {
                    $(".player1-head").text(playerName);
                } else if (playerNumber === 2) {
                    $(".player2-head").text(playerName);
                }

                activePlayers.push(playerNumber);
            })
        });

});

function hideFormFields() {
    $(".input-group").css("display", "none");
    $(".game-full").css({
        "display": "block",
        "color": "#fff",
        "text-align": "center"
    });
}

function checkExistingPlayer(){

    activePlayers.forEach(function(element){
        //if function is invoked, assumption is that
        //only one value should be present in array
        //max of two player numbers are allowed in db
        
        return element;//return first and only value
    })    
}