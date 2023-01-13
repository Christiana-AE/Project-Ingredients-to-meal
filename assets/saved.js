var allIngredients = [];
var userTopCategories = [];


// Function to show ingredients and save to Local storage
function showIngredients() {
    var currentIngredient = $("#search-input").val();
    allIngredients.push(currentIngredient);
    window.localStorage.setItem("myIngredients", JSON.stringify(allIngredients));
    console.log(allIngredients);
    renderSavedIngredients();
}

// Create a function to show the entered ingredients on the screen
function renderSavedIngredients() {
    // Clearing out existing list of ingredients to avoid repetition
    $("#enteredIngredients").empty();

    // Add list of saved ingredients entered to a list 
    for (var i = 0; i < allIngredients.length; i++) {

        // create a button to hold ingredients 
        var createButton = $("<button>");
        createButton.addClass("ingredients-available");
        createButton.attr("data-name", allIngredients[i]);
        createButton.text(allIngredients[i]);
        $("#enteredIngredients").append(createButton);
    }
}

function userCategoriesSelection() {
    $('input[class="mealoption"]:checked').each(function () {
        userTopCategories.push(this.value);
    });
}


// Event listener to add ingredients from user 
$("#save-button").on("click", function (e) {
    e.preventDefault();
    showIngredients();
});

//Event listener for when user clicks submit 
$("#submit-button").on("click", function (e) {
    e.preventDefault();
    userCategoriesSelection();
    location.href = "suggestions.html";
})

