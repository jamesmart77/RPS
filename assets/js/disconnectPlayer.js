//var connectedRef = database.ref(".info/connected");
// --------------------------------------------------------------
// connectedRef.on("value", function (snap) {

//     // If they are connected..
//     if (snap.val()) {

//         // Remove user from the connection list when they disconnect.
//         if (player.key !== 'blank') {
//             database.ref("players/" + player.key).onDisconnect().update({
//                 playerName: 'empty'
//             })
//             // player.onDisconnect().remove();
//         }
//     }
// });

$(window).unload(function () {
    if (player.key !== 'blank') {
        database.ref("players/" + player.key).remove()
        // player.onDisconnect().remove();
    }
});