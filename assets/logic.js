var APIspoonacular = "967014ffb258432b8a611d3960cb39de";
var allIngredients = [];
var currentIngredient;


// API Calls

function generateMealSuggestion() {
    allIngredients = JSON.parse(localStorage.getItem("myIngredients"));
    var ingredients = "";
    for (var i = 0; i < allIngredients.length; i++) {
        ingredients = ingredients + allIngredients[i] + ",+";
    }
    ingredients = ingredients.substring(0, ingredients.length - 2);
    var spoonacularURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + APIspoonacular + "&ingredients=" + ingredients + "&number=1"
    var foodNinjasURL = "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query="
    var FoodNutInfoURL = "https://food-nutrition-information.p.rapidapi.com/foods/search?query="

    // image for food suggestion 
    var foodName; //Name of suggested meal
    var usedIngredient; // First ingredient
    var usedIngredientTwo; // Second ingredient
    var imageURL; // Image URL
    var quantity; // Quantity of ingredients used
    var servings; // Servings of meal portion
    var cookingInstructions;
    var nutrients;
    var nutrientValue

    // Spoonacular Items 
    $.ajax({
        url: spoonacularURL,
        method: "GET"
    }).then(function (response) {
        imageURL = response[0].image;
        foodName = response[0].title;
        usedIngredient = response[0].usedIngredients[0].name;
        usedIngredientTwo = response[0].usedIngredients[1].name;
        console.log(response);


        // Recipe by API-Ninjas
        const settingsNinja = {
            "async": true,
            "crossDomain": true,
            "url": foodNinjasURL + foodName,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "31292e036fmshe6f344cc63a72ecp1a4a30jsnba601eb62a9e",
                "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com"
            }
        };


        $.ajax(settingsNinja).then(function (responseTwo) {
            quantity = responseTwo[0].ingredients;
            servings = responseTwo[0].servings;
            cookingInstructions = responseTwo[0].instructions;
            console.log(responseTwo);

            // Food Nutrition Information 
            const settingsFNI = {
                "async": true,
                "crossDomain": true,
                "url": FoodNutInfoURL + usedIngredient + "&pageSize=1",
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "31292e036fmshe6f344cc63a72ecp1a4a30jsnba601eb62a9e",
                    "X-RapidAPI-Host": "food-nutrition-information.p.rapidapi.com"
                }
            };

            $.ajax(settingsFNI).done(function (data) {
                nutrients = [];
                for (var i = 0; i < 7; i++) {
                    nutrientValue = data.foods[0].foodNutrients[i].nutrientName;
                    nutrients.push(nutrientValue);
                    console.log(nutrientValue);

                }

                //Create ingredients and append to page
                var createListOne = $("<li>");
                var createListTwo = $("<li>");
                createListOne.text(usedIngredient);
                createListTwo.text(usedIngredientTwo);
                $('#ingredient-list').append(createListOne);
                $('#ingredient-list').append(createListTwo);


                // Preparation Instructions and append to HTML

                // Append meal name to page
                $("#text-suggested-meal").text(foodName);

                // Meal image
                $("#image-suggested-meal").attr("src", imageURL);

                // Quantity
                $("#ingredient-quantity").text(quantity);

                // Servings 
                $("#meal-servings").text(servings);

                //Cooking instructions
                $("#how-to-prep").text(cookingInstructions);

                //Nutritional value

                for (var i = 0; i < nutrients.length; i++) {
                    var createSecondList = $("<li>");
                    createSecondList.addClass("your-nutrients");
                    createSecondList.attr("data-name", nutrients[i]);
                    createSecondList.text(nutrients[i]);
                    $("#individual-nutrients").append(createSecondList);

                }

            });

        });

    })

}


// //Event listener for when user clicks submit 
// $("#show-result").on("click", function (e) {
//     e.preventDefault();
//     generateMealSuggestion();
// })

generateMealSuggestion();




