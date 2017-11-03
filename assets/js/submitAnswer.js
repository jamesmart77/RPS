/*
TODO
- assign click event to player choices and map to player myAnswer
- within the if/then conditionals below, establish victor and looser
- assign win/loss respectively to player node
- present victor in results panel
*/

playersRef.on("child_changed", function (snapshot) {

    var playerOneAnswer
    var playerTwoAnswer
    var numberOfPlayers

    playerQuery.once("value")
        .then(function (snap) {

            numberOfPlayers = snap.numChildren();

            if (numberOfPlayers !== 2){return}//exit if not two players

            snap.forEach(function (childSnapshot) {
                var answer = childSnapshot.val().myAnswer;
                var playerNum = childSnapshot.val().playerNum;

                if(playerNum === 1){
                    playerOneAnswer = answer;
                } else {
                    playerTwoAnswer = answer;
                }
                //add to array
                //answers.push(answer);
            })

            //two players and both answers must not be 0 (default)
            if (numberOfPlayers === 2 && playerOneAnswer !== 0 && playerTwoAnswer !== 0){
                if(playerOneAnswer === 1 && playerTwoAnswer === 2){//rock vs paper
                    //player 2 wins
                } else if(playerOneAnswer === 1 && playerTwoAnswer === 3){//rock vs scissors
                    //player 1 wins
                } else if(playerOneAnswer === 1 && playerTwoAnswer === 1){//rock vs rock
                    //tie
                } else if(playerOneAnswer === 2 && playerTwoAnswer === 1){//paper vs rock
                    //player 1 wins
                } else if(playerOneAnswer === 2 && playerTwoAnswer === 2){//paper vs paper
                    //tie
                } else if(playerOneAnswer === 2 && playerTwoAnswer === 3){//paper vs scissors
                    //player 2 wins
                } else if(playerOneAnswer === 3 && playerTwoAnswer === 1){//scissors vs rock
                    //player 2 wins
                } else if(playerOneAnswer === 3 && playerTwoAnswer === 2){//scissors vs paper
                    //player 1 wins
                } else if(playerOneAnswer === 3 && playerTwoAnswer === 3){//scissors vs scissors
                    //tie
                }
            }
        });
})