// select all card buttons
var cardButtonElements = document.querySelectorAll(".card-button");
cardButtonElements.forEach(addPlanetButtonListener);

// for each button, add the event listener
function addPlanetButtonListener(cardButtonElement) {
  cardButtonElement.addEventListener("click", cardButtonClick);
}

// on click, do something with the selected button
function cardButtonClick(event) {
    var clickedButton = event.currentTarget;
    
    // for now, just alert the answer
    // (you'll change this in a minute!)
    alert("You clicked " + clickedButton.textContent);

}

function cardButtonClick(event) {
    var clickedButton = event.currentTarget;

    // replace the 'alert' with this new code to update the page
    var resultElement = document.querySelector(".result");
    resultElement.textContent = "You selected " + clickedButton.textContent;

    // remove selected state from all buttons
    cardButtonElements.forEach(updateClickedButtonState);
    
    // add the selected state just to button that was clicked
    clickedButton.classList.add("currently-selected");
}

function updateClickedButtonState(cardButtonElement) {
    cardButtonElement.classList.remove("currently-selected");
}