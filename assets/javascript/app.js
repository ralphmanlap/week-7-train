// Initializing Firebase
var config = {
    apiKey: "AIzaSyCzAYz_Jjoi-k_5FHlHgxnufdHYJFZpQRs",
    authDomain: "train-schedule-53d85.firebaseapp.com",
    databaseURL: "https://train-schedule-53d85.firebaseio.com",
    storageBucket: "train-schedule-53d85.appspot.com",
    messagingSenderId: "60020030352"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Declaring variables
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;


// Adding name, destination, time of frist train, and frequency
$("#addTrain").on("click", function() {

  name = $("#name").val().trim();
  dest = $("#destination").val().trim();
  firstTrain = $("#first").val().trim();
  freq = $("#freq").val().trim();

//Testing if values were going through
  // console.log(name);
  // console.log(dest);
  // console.log(firstTrain);
  // console.log(freq);

//pushing values to firebase
  database.ref().push({
    name: name,
    dest: dest,
    firstTrain: firstTrain,
    freq: freq
  });

    return false;
});


// 
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // update the variable with data from the database
  name = snapshot.val().name;
  dest = snapshot.val().dest;
  firstTrain = snapshot.val().firstTrain;
  freq = snapshot.val().freq;


  // moment.js methods for time calls and calculations. lines 57 to 65 were accomplished with Tenor's assistance. I didn't update the current time. It looks like "Minutes Away" may be larger than the frequency interval :(
  var firstTrainMoment = moment(firstTrain, 'HH:mm');
  var now = moment(); // when the user clicks submit, creates moment obj for current time and storing it in a var 

  var minutesSinceFirstArr = now.diff(firstTrainMoment, "minutes");
  var minutesSinceLastArr = minutesSinceFirstArr % freq;
  var minutesAway = freq - minutesSinceLastArr;

  var nextArr = now.add(minutesAway, "minutes");
  var formatNextArr = nextArr.format("LT");


  //table for train info
  var tr = $("<tr>");
  var nametd = $("<td>");
  var desttd = $("<td>");
  var freqtd = $("<td>");
  var nexttd = $("<td>");
  var minstd = $("<td>");

  nametd.append(name);
  desttd.append(dest);
  freqtd.append(freq);
  nexttd.append(formatNextArr);
  minstd.append(minutesAway);

  tr.append(nametd);
  tr.append(desttd);
  tr.append(freqtd);
  tr.append(nexttd);
  tr.append(minstd);
  $("#trainTable").append(tr);


  }, function (errorObject) {

  // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);

});