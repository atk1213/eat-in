var config = {
    apiKey: "AIzaSyDORz1e9e4aHUhPBHLbtxoBsE5z6DT5980",
    authDomain: "eat-in-c8063.firebaseapp.com",
    databaseURL: "https://eat-in-c8063.firebaseio.com",
    projectId: "eat-in-c8063",
    storageBucket: "eat-in-c8063.appspot.com",
    messagingSenderId: "1078349257986"
};
firebase.initializeApp(config);

var database = firebase.database();


$(document).on("click", ".find-button", function () {
    // var searchIngredients = array joined by "+" or "%20";
    // searchIngredients.toString();
    // var searchIngredients = str.replace(",", "+");
    var apiKey = "2b8eb696ebf1b4d8ff30c5e5d4e49b39";
    var appID = "dbd3948d";
    var queryURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + appID + "&_app_key=" + apiKey;
    var recipeId;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.matches;
        console.log(results);
        for (var j = 0; j < results.length; j++) {
            var mealImage = results[j].smallImageUrls;
            var mealName = results[j].recipeName;
            var mealTime = results[j].totalTimeInSeconds;
            var mealId = results[j].id;
            // push data from api call to firebase
            var recipes = [{
                name: mealName,
                image: mealImage,
                time: mealTime,
                id: mealId,
            }];
            database.ref().push(recipes);
            //     database.ref().on("child_added", function(childSnapshot, prevChildKey) {
            //          name = 
            // })
        }
    })
    
    database.ref("recipes").on("child_added", function(childSnapshot, prevChildKey) {

        // console.log(childSnapShot.val());
        
        var mealImage = childSnapshot.val().image;
        var mealName = childSnapshot.val().name;
        var mealTime = childSnapshot.val().time;
        var mealId = childSnapshot.val().id;
        var getRecipe = ("<button value = mealId>");


        // var currentTime = moment();
        var convertTime = moment(mealTime);
        
       
        $("#recipeTable > tbody").append("<tr><td><img src=" + mealImage + "></td><td>" + mealName + "</td><td>" + convertTime + "</td><td><button id='getrecipe' value=" + mealId + "></button></td></tr>");

    // $("#preRecipes").empty();
    // for (var j = 0; j < results.length; j++) {
    //     var mealImage = results[j].smallImageUrls;
    //     var displayMealImage = $("<img>").attr("src", mealImage);
    //     mealImage.attr("alt", "meal image");
    //     // $("#preRecipes").append(mealImage);
    //     var mealName = results[j].name;
    //     // var displayMealName = $("<p>").html(mealName);
    //     // append
    //     var mealTime = results[j].totalTimeInSeconds;
    //     // var displayMealTime = $("<p>").html(mealTime);
    //     // append
    // }