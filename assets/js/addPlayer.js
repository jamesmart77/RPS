var playersRef = database.ref("/players");
var connectedRef = database.ref(".info/connected");
var player
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

    //add player to database
    playersRef.once("value", function (snapshot) {

        //look at current number of players on app
        let playerCount = snapshot.numChildren();
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
        }
    });

    $("#playerName").val("");
}