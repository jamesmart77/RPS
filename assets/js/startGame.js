//var playerListener = database.ref("players/" + p);
var initialQuery = database.ref("initialGame");

//check if this is start of game with two new players
function initialChecker() {

    // initialQuery.once("value")
    //     .then(function (snap) {
    //         snap.forEach(function (childSnapshot) {
    //             var checkerVal = childSnapshot.val();//get initialGame flag value

    //             //initial flag was true
    //             if (checkerVal) {
    //                 database.ref('initialGame/flag').set(false)//set flag to false
    //                 startGame();//function below
    //             }
    //         })
    //     });

    //if player.key is not blank (meaning user is an active player)
    playerQuery.once("value")
    .then(function (snap) {
        let childCount = snap.numChildren();

        if(childCount = 2){
            if(player.key !== "blank"){
                $(".btn-key").removeClass('btn-options-invisible').addClass('btn-options-visible');
                $(".game-updates").html("<p>Let's battle! Choose your weapon!</p>")
            }
        }

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
