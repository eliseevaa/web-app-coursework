// add a listener to buttons
var cardButtonElements = document.querySelectorAll(".card-button");
cardButtonElements.forEach(addPlanetButtonListener);

// add the event listener for each button
function addPlanetButtonListener(cardButtonElement) {
    cardButtonElement.addEventListener("click", cardButtonClick);
}

// when a button has been clicked, show its content
function cardButtonClick(event) {
    var clickedButton = event.currentTarget;
    updateLog(clickedButton.textContent);

    // generate the class of the selected card's details element
// for example: ".card-details-Venus" or ".card-details-Earth"
var detailsElementCssSelector = ".card-details-" + clickedButton.textContent;

// find this element
var detailsElement = document.querySelector(detailsElementCssSelector);

// remove selected state from all details elements
var cardDetailElements = document.querySelectorAll(".card-details-");
cardDetailElements.forEach(updatePlanetDetailState);

// add selected state just to the clicked button
detailsElement.classList.add("currently-selected-card");

function updatePlanetDetailState(cardDetailElement) {
    cardDetailElement.classList.remove("currently-selected-card");
}

function updateLog(cardName) {
    var timeNow = new Date().toUTCString();

    var newListElement = document.createElement("li");
    newListElement.classList.add("log-item");
    newListElement.textContent = timeNow + ": " + cardName + " clicked";

    var logElement = document.querySelector(".log");
    logElement.appendChild(newListElement);
}

}