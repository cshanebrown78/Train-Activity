

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

  //Puts the form information variables into variables stored in firebase
  var newTrain = {
      name: trainName,
      role: trainDestination,
      firstTrain: initialTrain,
      frequency: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Pushes the information to the database  
  database.ref().push(newTrain);


// Empties the form data fields
$("#trainName").val("");
$("#tDestination").val("");
$("#firstTrain").val("");
$("#tFreq").val("");

});

database.ref().on("child_added", function(childSnapshot){
    
    // Sets the latest child added to the variables
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var initialTrain = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;
    
    
    // Sets the initial train time to a year prior so it will be before any new time entered
    var initialTimeConverted = moment(initialTrain, "HH:mm").subtract(1, "years");
    
    // Difference between the converted time above and the current time
    var timeDiff = moment().diff(moment(initialTimeConverted),"minutes");

    // Calculates the modulus so that the time remaining can be calculated
    timeModulus = timeDiff % trainFreq;

    // Takes the frequency less the modulus (remainder) and gives us minutes away
    var minsAway = trainFreq - timeModulus;

    // Calculation adds minutes away to the current time and gives us next arrival which is converted to standard 12hr format
    var incomingTrain = moment().add(minsAway, "minutes");
    var nextArrival = moment(incomingTrain).format("hh:mm A");


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