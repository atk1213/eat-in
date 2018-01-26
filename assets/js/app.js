// $(document).ready(function () {
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
//---------------------------------------------------------------------

var listIngredients = ["onion", "garlic", "carrot", "celery", "broccoli",
    "cauliflower", "potato", "sweet potato", "red onion", "bell pepper",
    "shallot", "eggplant", "zucchini", "chicken", "beef",
    "pork", "shrimp", "salmon", "tilapia", "butter", "milk", "cheddar", "cheese",
    "egg", "salt", "pepper", "parsley"
];
var searchIngredients = [];
var difficulty = ["Easy", "Medium", "Hard"];
var time = ["HH:mm"];
var apiKey = "2b8eb696ebf1b4d8ff30c5e5d4e49b39";
var appID = "dbd3948d";

var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=" + appID + "&_app_key=" + apiKey + "&your_search_parameters";

//-----------------------------------------------------------------

function renderButtons() {
    $("#ingredientButton").empty();
    for (var i = 0; i < listIngredients.length; i++) {
        var a = $("<button>");
        a.addClass("ingredient-button");
        a.attr("data-name", listIngredients[i]);
        a.text(listIngredients[i]);
        $("#ingredientButton").append(a);
    }
};
renderButtons();
// $("button").css({"margin-right": "5px"});

$(document).on("click", "#add", function () {
    event.preventDefault();
    if ($("#add").val().trim() == "") {
        alert("Please type ingredient to add");
    } else {
        var userEntry = $("#addEntry").val().trim();
        listIngredients.push(userEntry);
        $("#addEntry").val("");
        renderButtons();
        return false;
    }
});

$(document).on("click", ".ingredient-button", function () {

    var addedIngredient = $("<button>");
    addedIngredient.addClass("selected-ingredient-button");
    addedIngredient.text($(this).attr("data-name"));
    $("#ingredientList").append(addedIngredient);
    ingredient = $(this).text();
    searchIngredients.push(ingredient);
    console.log(searchIngredients);

});


$(document).on("click", ".selected-ingredient-button", function () {
    ingredient = $(this).val();
    listIngredients.push(ingredient);
    // searchIngredients.splice(4, 2);

    // renderButtons();
});

$(document).on("click", ".clear-button", function () {
    $("#ingredientList").empty();
    searchIngredients = [];
});


$(document).on("click", ".find-button", function () {
    var searchQuery = searchIngredients.join("+");
    console.log("searchterms:" + searchQuery);

    var apiKey = "2b8eb696ebf1b4d8ff30c5e5d4e49b39";
    var appID = "dbd3948d";
    var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=" + appID + "&_app_key=" + apiKey + "&q=" + searchQuery + "&maxResult=10&start=10";
    console.log("api url:" + queryURL);

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
            database.ref("recipes").push(recipes);

            //     database.ref().on("child_added", function(childSnapshot, prevChildKey) {
            //          name = 
            // })
        }
    })



    // $("#preRecipes").empty();
    //     // $("#preRecipes").append(mealImage);
    // mealImage.attr("alt", "meal image");
    //     // var displayMealName = $("<p>").html(mealName);
    //     var displayMealImage = $("<img>").attr("src", mealImage);
    //     // append
    //     // var displayMealTime = $("<p>").html(mealTime);
    //     // append
});