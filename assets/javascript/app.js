

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
  var initialTrain = moment($("#firstTrain").val().trim(),"HH:mm").format("HH:mm");
  var trainFreq = $("#tFreq").val().trim(); 

  
  var newTrain = {
      name: trainName,
      role: trainDestination,
      firstTrain: initialTrain,
      frequency: trainFreq
  };

  // Pushes the information to the database  
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

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
    var nextArrival = "1:00 PM";
    var minsAway = 22;

    console.log(trainName);
    console.log(trainDestination);
    console.log(initialTrain);
    console.log(trainFreq);

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