/*
TODO
- assign click event to player choices and map to player myAnswer
- within the if/then conditionals below, establish victor and looser
- assign win/loss respectively to player node
- present victor in results panel
*/
var isFirstPassComplete = true;

$(".body-1").on("click", ".btn-key", function () {
    database.ref("players/" + player.key).update({
        myAnswer: ($(this).data('integer'))
    })
})

$(".body-2").on("click", ".btn-key", function () {
    database.ref("players/" + player.key).update({
        myAnswer: $(this).data('integer')
    })
})


playersRef.on("child_changed", function (snapshot) {

    if (isFirstPassComplete) {
        var playerOneInfo = {
            answer: 0,
            key: "",
            existingWins: 0,
            existingLossses: 0,
            wins: 0,
            losses: 0
        }

        var playerTwoInfo = {
            answer: 0,
            key: "",
            existingWins: 0,
            existingLossses: 0,
            wins: 0,
            losses: 0
        }

        var numberOfPlayers

        playerQuery.once("value")
            .then(function (snap) {

                numberOfPlayers = snap.numChildren();

                if (numberOfPlayers !== 2) {
                    return
                } //exit if not two players

                snap.forEach(function (childSnapshot) {
                    var answer = childSnapshot.val().myAnswer;
                    var playerNum = childSnapshot.val().playerNum;
                    var playerKey = childSnapshot.key;
                    var wins = childSnapshot.val().wins;
                    var losses = childSnapshot.val().losses;


                    if (playerNum === 1) {
                        playerOneInfo.answer = answer;
                        playerOneInfo.key = playerKey;
                        playerOneInfo.existingWins = wins;
                        playerOneInfo.existingLossses = losses;
                    } else {
                        playerTwoInfo.answer = answer;
                        playerTwoInfo.key = playerKey;
                        playerTwoInfo.existingWins = wins;
                        playerTwoInfo.existingLossses = losses;
                    }

                })

                //two players and both answers must not be 0 (default)
                if (numberOfPlayers === 2 && playerOneInfo.answer !== 0 && playerTwoInfo.answer !== 0) {
                    if (playerOneInfo.answer === 1 && playerTwoInfo.answer === 2) { //rock vs paper
                        //player 2 wins
                        playerOneInfo.losses = 1;
                        playerTwoInfo.wins = 1;
                        updateScores(playerOneInfo, playerTwoInfo)
                        //database.ref("players/" + playerOneInfo.key).set({losses: playerOneInfo.losses + 1})
                        //database.ref("players/" + playerTwoInfo.key).set({wins: playerTwoInfo.wins + 1})
                    } else if (playerOneInfo.answer === 1 && playerTwoInfo.answer === 3) { //rock vs scissors
                        //player 1 wins
                        database.ref("players/" + playerOneInfo.key).update({
                            wins: playerOneInfo.wins + 1
                        })
                        database.ref("players/" + playerTwoInfo.key).update({
                            losses: playerTwoInfo.losses + 1
                        })
                    } else if (playerOneInfo.answer === 1 && playerTwoInfo.answer === 1) { //rock vs rock
                        //tie
                    } else if (playerOneInfo.answer === 2 && playerTwoInfo.answer === 1) { //paper vs rock
                        //player 1 wins
                        database.ref("players/" + playerOneInfo.key).update({
                            wins: playerOneInfo.wins + 1
                        })
                        database.ref("players/" + playerTwoInfo.key).update({
                            losses: playerTwoInfo.losses + 1
                        })
                    } else if (playerOneInfo.answer === 2 && playerTwoInfo.answer === 2) { //paper vs paper
                        //tie
                    } else if (playerOneInfo.answer === 2 && playerTwoInfo.answer === 3) { //paper vs scissors
                        //player 2 wins
                        database.ref("players/" + playerOneInfo.key).update({
                            losses: playerOneInfo.losses + 1
                        })
                        database.ref("players/" + playerTwoInfo.key).update({
                            wins: playerTwoInfo.wins + 1
                        })
                    } else if (playerOneInfo.answer === 3 && playerTwoInfo.answer === 1) { //scissors vs rock
                        //player 2 wins
                        database.ref("players/" + playerOneInfo.key).update({
                            losses: playerOneInfo.losses + 1
                        })
                        database.ref("players/" + playerTwoInfo.key).update({
                            wins: playerTwoInfo.wins + 1
                        })
                    } else if (playerOneInfo.answer === 3 && playerTwoInfo.answer === 2) { //scissors vs paper
                        //player 1 wins
                        database.ref("players/" + playerOneInfo.key).update({
                            wins: playerOneInfo.wins + 1
                        })
                        database.ref("players/" + playerTwoInfo.key).update({
                            losses: playerTwoInfo.losses + 1
                        })
                    } else if (playerOneInfo.answer === 3 && playerTwoInfo.answer === 3) { //scissors vs scissors
                        //tie
                    }

                    database.ref("players/" + player.key).update({
                        myAnswer: 0
                    })
                }
            });
    }
})

function updateScores(playerOneInfo, playerTwoInfo) {

    isFirstPassComplete = false;
    
    database.ref("players/" + playerOneInfo.key).update({
        losses: playerOneInfo.existingLossses + playerOneInfo.losses,
        wins: playerOneInfo.existingWins + playerOneInfo.wins
    })
    database.ref("players/" + playerTwoInfo.key).update({
        wins: playerTwoInfo.existingWins + playerTwoInfo.wins,
        losses: playerTwoInfo.existingLossses + playerTwoInfo.losses
    })

    isFirstPassComplete = true;
}