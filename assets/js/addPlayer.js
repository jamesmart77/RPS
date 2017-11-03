var playersRef = database.ref("/players");
var playerCount
var playerQuery = firebase.database().ref("players").orderByKey();
var activePlayers = []
var currentPlayerName
var player = {
    key: "blank"
}

function addPlayer() {

    isInitialLoad = false; //global variable for message notifications

    //get user name input
    currentPlayerName = $("#playerName").val();

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

                //only two players are allowed in db so by default if 1 child exists
                //take 1st index of activePlayers array
                existingPlayerNum = activePlayers[0];

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
                playerName: currentPlayerName,
                wins: 0,
                losses: 0,
                myTurn: false,
                myAnswer: 0
            });

            hideFormFields(); //needed here in case there's only one player
            addPlayerButtons(playerIndex);
        }
    });

    $("#playerName").val("");
}

//listening for player count updates
playersRef.on("value", function (snapshot) {

    //look at current number of players on app
    playerCount = snapshot.numChildren();
    activePlayers = []; //reset array to get latest

    playerQuery.once("value")
        .then(function (snap) {
            snap.forEach(function (childSnapshot) {
                var playerNumber = childSnapshot.val().playerNum;
                var playerName = childSnapshot.val().playerName;

                //update panel headers for player name
                if (playerNumber === 1) {
                    $(".player1-head").text(playerName);
                } else if (playerNumber === 2) {
                    $(".player2-head").text(playerName);
                }

                //add to array
                activePlayers.push(playerNumber);
            })
        });

    //hide Join Game input form if 2 players join
    if (playerCount >= 2) {
        hideFormFields();
        initialChecker();

    } else {
        $(".input-group").css({
            "display": "table",
            "margin": "0 auto",
            "width": "60%",
            "padding": "0",
            "float": "none"
        });
        $(".game-updates").css("display", "none");
    }

});

function hideFormFields() {
    $(".input-group").css("display", "none");
    $(".game-updates").css({
        "display": "block",
        "color": "#fff",
        "text-align": "center"
    });
}

function addPlayerButtons(playerNum) {

    for (var i = 1; i < 4; i++) {

        let btn = $("<button class='btn-key btn-options-invisible btn btn-warning btn-xs'>");
        let btnDetails

        if (i === 1) {
            btnDetails = 'Rock'
        } else if (i === 2) {
            btnDetails = 'Paper'
        } else {
            btnDetails = 'Scissors'
        }

        btn.attr('data-integer', i);
        btn.html(btnDetails);
        $(".body-" + playerNum).append(btn);
    }

}