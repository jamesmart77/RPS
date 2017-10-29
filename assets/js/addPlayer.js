var playersRef = database.ref("/players");
var connectedRef = database.ref(".info/connected");
var player
var playerCount
// --------------------------------------------------------------
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        if (player !== undefined) {
            // Remove user from the connection list when they disconnect.
            player.onDisconnect().remove();
        }
    }
});

function addPlayer() {

    //get user name input
    var playerName = $("#playerName").val();

    // database.ref().child("players").orderByChild("playerNum").equalTo("1").once("value", snapshot => {
    //     const userData = snapshot.val();
    //     if (userData) {
    //         console.log("Player 1 exists!");
    //     } else {
    //         console.log("Player 1 does NOT exist!");
    //     }
    // });

    // database.ref().child("players").orderByChild("playerNum").equalTo("2").once("value", snapshot => {
    //     const userData = snapshot.val();
    //     if (userData) {
    //         console.log("Player 2 exists!");
    //     } else {
    //         console.log("Player 2 does NOT exist!");
    //     }
    // });

    //add player to database
    playersRef.once("value", function (snapshot) {

        //look at current number of players on app
        playerCount = snapshot.numChildren();
        let playerIndex
        let existingPlayerNum

        //2 players only allowed
        if (playerCount < 2) {
            if (playerCount === 0) {
                // Add user to the connections list.
                playerIndex = 1;

            } else if (playerCount === 1) {

                playersRef.orderByChild("playerNum").once("value", function (snapshot) {
                    existingPlayerNum = snapshot.val().playerNum;
                });

                //need better way to get existingPlayerNum
                //this will cause issues if one player leaves and one remains and then another user wants to play previously existing user
                if (existingPlayerNum === undefined) {
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

            if (playerIndex === 1) {
                $(".player1-head").text(playerName);
            } else {
                $(".player2-head").text(playerName);
            }

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

});

function hideFormFields() {
    $(".input-group").css("display", "none");
    $(".game-full").css({
        "display": "block",
        "color": "#fff",
        "text-align": "center"
    });
}


//listening for player changes and getting current player info
database.ref("players").orderByChild("playerNum").on("value", function (snapshot) {

    var query = firebase.database().ref("players").orderByKey();
    query.once("value")
        .then(function (snap) {
            snap.forEach(function (childSnapshot) {
                var playerKey = childSnapshot.key;
                var playerData = childSnapshot.val();

                // console.log(playerKey)
                console.log(playerData.val().playerNum)
            })
        });
});