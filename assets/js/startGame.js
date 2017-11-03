//var playerListener = database.ref("players/" + p);
var initialQuery = database.ref("initialGame");

//check if this is start of game with two new players
function initialChecker() {

    initialQuery.once("value")
        .then(function (snap) {
            snap.forEach(function (childSnapshot) {
                var checkerVal = childSnapshot.val();//get initialGame flag value

                //initial flag was true
                if (checkerVal) {
                    database.ref('initialGame/flag').set(false)//set flag to false
                    startGame();//function below
                }
            })
        });
}

playersRef.on("child_changed", function (snapshot) {

    var myTurnArr = [];
    var areAllFalse = true;

    // if (snapshot.numChildren() < 2) {
    //     return
    // }

    //query each player myTurn value & set to array
    playerQuery.once("value")
        .then(function (snap) {
            snap.forEach(function (childSnapshot) {
                myTurnArr.push(childSnapshot.val().myTurn);
            })
        });

    //check if each player myTurn is set to false (initial start to game)
    myTurnArr.forEach(function (element) {
        if (element) {
            alert("found a true")
            areAllFalse = false;
        }
    })

    if (!areAllFalse) {
        alert("all false")
    }
})

//to start game, set player 1 turn to true
function startGame() {

    playerQuery.once("value")
        .then(function (snap) {
            snap.forEach(function (childSnapshot) {
                var playerNumber = childSnapshot.val().playerNum;

                if (playerNumber === 1) {
                    database.ref("players/" + childSnapshot.key).update({myTurn: true});
                    alert("player"+ playerNumber + " has been updated!")
                }


            })
        });

}