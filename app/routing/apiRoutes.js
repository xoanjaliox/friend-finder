// LOAD DATA
// =============================================================
var friends = require('../data/friends');

module.exports = function(app){
  // API Routes
  // =============================================================

  // Displays all friends
  app.get("/api/friends", function(req, res) {
      return res.json(friends);
    });

  // Displays a single friend who matched with your results, or returns false
  app.get("/api/friends/:friend", function(req, res) {
    var chosen = req.params.name;
  
    console.log(chosen);
  
    for (var i = 0; i < friends.length; i++) {
      if (chosen === friends[i].name) {
        return res.json(friends[i]);
      }
    }
  
    return res.json(false);
  });

  // Create New Friend - takes in JSON input
  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;

    //computes total score for new friend
    newFriend.totalScore = newFriend.score.map(Number).reduce((a, b) => a + b, 0);
    console.log("newFriend totalScore: ", newFriend.totalScore);

    var matchIndex = 0;
    var maxDiff = 40;
    var totalDiff = 0;
    //first for loop to run through each friend in list
    for (let index = 0; index < friends.length; index++) {
      var tempScore = 0;
      //second for loop to add total score of each friend in list
      for (let j = 0; j < friends[index].scores.length; j++) {
       // var diff = parseInt(friends[index].scores[j])
        tempScore += parseInt(friends[index].scores[j]);
        totalDiff = Math.abs(newFriend.totalScore - tempScore);
      }
      console.log(friends[index].name + "'s totalScore ", tempScore);
      console.log(totalDiff, "is the difference in total score between newFriend & "+ friends[index].name);

      //check to see if friend[index].totalScore is less than maxDiff (closest match)
      if (totalDiff < maxDiff){
        matchIndex = index;
        console.log("matchIndex", matchIndex);
        maxDiff = totalDiff;
        console.log("maxDiff", maxDiff);
      }
    }

    //add newFriend to friend list after finding closest match
    friends.push(newFriend);

    //return match
    return res.json(friends[matchIndex]);
  });
}
  