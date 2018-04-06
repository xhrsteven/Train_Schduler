//Initialize Firebase
var config ={
    apiKey:"AIzaSyCoc1A7IPq3f-554JErjawDSnuZP7O9GwU",
    authDomain: "train-schedule-6e425.firebaseapp.com",
    databaseURL: "https://train-schedule-6e425.firebaseio.com",
    storageBucket: "train-schedule-6e425.appspot.com"
};

firebase.initializeApp(config);
//Create a variable to reference the database
var database = firebase.database();

//Capture Button Click

$('#add-train').on('click',function(e){
    //prevent the submit button from trying to submit a form when clicked
    e.preventDefault();
    //Grabbed values from form
    var train_name = $('#train-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var firstTime = $('#first-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

    //Create local temporary object for holding data
    var newTrain = {
        name: train_name,
        destination: destination,
        time: firstTime,
        frequency: frequency
    }
    //Setting value in database
    database.ref().push(newTrain);

    //Clear all the text in boxes
    $("#train-input").val('');
    $('#destination-input').val('');
    $('#first-input').val('');
    $('#frequency-input').val();
});

//Firebase watcher + initial loader
database.ref().on('child_added', function(snapshot, preKey){
    console.log(snapshot.val());

    //Store into variable
    var trainName = snapshot.val().name;
    var trainTime = snapshot.val().time;
    var trainDest = snapshot.val().destination;
    var trainFreq = snapshot.val().frequency;

    //Moment Method
})

