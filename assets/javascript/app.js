

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCAgy5Lb60V5etxczj1JgHq_skNOUL2MDI",
    authDomain: "trainapp-a9aa4.firebaseapp.com",
    databaseURL: "https://trainapp-a9aa4.firebaseio.com",
    projectId: "trainapp-a9aa4",
    storageBucket: "trainapp-a9aa4.appspot.com",
    messagingSenderId: "1038401254783",
    appId: "1:1038401254783:web:ddfdb3cc4053b915b3564a"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding Trains
$(".new-train-btn").on("click", function(event) {
    event.preventDefault();

  //Pulls the input from the form 
  var trainName = $("#trainName").val().trim();
  var trainDestination = $("#tDestination").val().trim();
  var initialTrain = $("#firstTrain").val().trim();
  var trainFreq = $("#tFreq").val().trim(); 

  
  var newTrain = {
      name: trainName,
      role: trainDestination,
      firstTrain: initialTrain,
      frequency: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Pushes the information to the database  
  database.ref().push(newTrain);


//   console.log(newTrain.name);
//   console.log(newTrain.role);
//   console.log(newTrain.firstTrain);
//   console.log(newTrain.frequency);

$("#trainName").val("");
$("#tDestination").val("");
$("#firstTrain").val("");
$("#tFreq").val("");

});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var initialTrain = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;
    // var nextArrival = "";
    // var minsAway = 0;

    // console.log(trainName);
    // console.log(trainDestination);
    console.log("Initial Train " + initialTrain);
    // console.log(trainFreq);

    var initialTimeConverted = moment(initialTrain, "HH:mm").subtract(1, "years");
    console.log("initial converted " + initialTimeConverted);


    var currentTime = moment();
    console.log("Current time: " + currentTime);


    var timeDiff = moment().diff(moment(initialTimeConverted),"minutes");
    console.log("Time difference: " + timeDiff);


    timeModulus = timeDiff % trainFreq;
    console.log("Time Modulus: " + timeModulus);


    var minsAway = trainFreq - timeModulus;
    console.log("Minutes away: " + minsAway);


    var incomingTrain = moment().add(minsAway, "minutes");
    var nextArrival = moment(incomingTrain).format("hh:mm A");
    console.log(nextArrival);


    // var convertedInitial = moment.unix(initialTrain).format("hh:mm A");
    // console.log(convertedInitial);

// Appends new trains to table in HTML
$("tbody").append(`
    <tr>
        <td>${trainName}</td>
        <td>${trainDestination}</td>
        <td>${trainFreq}</td>
        <td>${nextArrival}</td>
        <td>${minsAway}</td>
    </tr>
`);

});