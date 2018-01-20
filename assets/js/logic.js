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


$(document).on("click", "#search", function () {
    // var searchIngredients = array joined by "+" or "%20";
    // searchIngredients.toString();
    // var searchIngredients = str.replace(", ", "+");
    var apiKey = "2b8eb696ebf1b4d8ff30c5e5d4e49b39";
    var appID = "dbd3948d";
    var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=" + appID + "&_app_key=" + apiKey + "&q=" + ingredientSelection + "&maxResult=10&start=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;
        // push data from api call to firebase
    })
    
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

});