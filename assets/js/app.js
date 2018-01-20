// $(document).ready(function () {
var listIngredients = ["onion", "garlic", "carrot", "celery", "broccoli",
    "cauliflower", "potato", "sweet potato", "red onion", "bell pepper",
    "shallot", "eggplant", "zucchini", "chicken", "beef",
    "pork", "shrimp", "salmon", "tilapia", "butter", "milk", "cheddar", "cheese"];
var searchIngredients = [];
var difficulty = ["Easy", "Medium", "Hard"];
var time = ["HH:mm"];
var apiKey = "2b8eb696ebf1b4d8ff30c5e5d4e49b39";
var appID = "dbd3948d";


var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=" + appID + "&_app_key=" + apiKey + "&your_search_parameters";


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
$("button").css({ "margin-right": "5px" });


$(document).on("click", "#add", function () {
    if ($("#add").val().trim() == "") {
        alert("Please type ingredient to add");
    }
    else {
        var userEntry = $("#addEntry").val().trim();
        listIngredients.push(userEntry);
        $("#addEntry").val("");
        renderButtons();
        $("button").css({ "margin": "5px", "padding": "5px" });
        console.log("user entry:" + userEntry);
        console.log("array:" + listIngredients);
        return false;
        //enter key should submit and render buttons too...
    }
});

$(document).on("click", ".ingredient-button", function () {
    ingredient = $(this).text();
    searchIngredients.push(ingredient);
    listIngredients.splice(ingredient);
    function renderSearchIngredientButton() {
        $("#selectedIngredients").empty();
        for (var j = 0; j < searchIngredients.length; j++) {
            var b = $("<button>");
            b.addClass("selected-ingredient-button");
            b.attr("data-name", searchIngredients[i]);
            b.text(searchIngredients[i]);
            $("#selectedIngredients").append(b);
            console.log(b);
        }
    };
    console.log(ingredient);
    console.log(searchIngredients);
});

$(document).on("click", ".selected-ingredient-button", function () {
    ingredient = $(this).val();
    listIngredients.push(ingredient);
    searchIngredients.splice(ingredient);
    renderButtons();
});

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   })

// })