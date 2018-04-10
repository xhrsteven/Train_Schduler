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

//Link to Firebase Database for viewer tracking
// var connectionsRef = database.ref('/connections');

// var connectedRef = database.ref('.info/connected');

// connectedRef.on('value', function (snapshot) {
    
//     if (snapshot.val()) {
//         var con = connectionsRef.push(true);

//         con.onDisconnect().remove();
//     }
// })

// connectionsRef.on('value', function (snapshot) {
    
// })
//Capture Button Click
$(document).ready(function () {

    $('#add-train').on('click',function(e){
        //prevent the submit button from trying to submit a form when clicked
        e.preventDefault();
        //Grabbed values from form
        var train_name = $('#train-input').val().trim();
        var destination = $('#destination-input').val().trim();
        var firstTime = moment($('#first-input').val().trim(),'HH:mm').subtract(1,'years');
        // console.log(firstTime);
        var frequency = $('#frequency-input').val().trim();
        //moment method

        var diffTime = moment().diff(moment(firstTime), 'minutes');
        var timeReminder = diffTime % frequency;
        var minutesAway = frequency - timeReminder;
        var nextTime = moment().add(minutesAway, 'minutes');
        var nextArrival = moment(nextTime).format('hh:mm A');

        //Create local temporary object for holding data
        var newTrain = {
            name: train_name,
            destination: destination,
            frequency: frequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway
        }
        //Setting value in database
        database.ref().push(newTrain);
       
        //Clear all the text in boxes
        $("#train-input").val('');
        $('#destination-input').val('');
        $('#first-input').val('');
        $('#frequency-input').val('');
    });

    //Firebase watcher + initial loader
    database.ref().on('child_added', function(snapshot){
        // console.log(snapshot.val());

        //Store into variable
        var trainName = snapshot.val().name;
        var trainNextTime = snapshot.val().nextArrival;
        var trainDest = snapshot.val().destination;
        var trainFreq = snapshot.val().frequency;
        var trainAway = snapshot.val().minutesAway;

        //Add each data to table
        $('#train-table').append('<tr><td>'+trainName +'</td><td>'+trainDest+'</td><td>'+trainFreq+'</td><td>'+trainNextTime+'</td><td>'+trainAway+'</td></tr>');
        
    })
})
