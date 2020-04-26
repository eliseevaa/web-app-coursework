// initial setup: add a listener to buttons
var cardButtonElementsGlobal = document.querySelectorAll(".card-button");
cardButtonElementsGlobal.forEach(addCardButtonListener);
updateUISelectingButton(cardButtonElementsGlobal[0]);

// adding listener
function addCardButtonListener(cardButtonElement) {
    cardButtonElement.addEventListener("click", handleCardButtonClick);
}

// event handling
function handleCardButtonClick(event) {
    var clickedButton = event.currentTarget;
    updateUISelectingButton(clickedButton)
}

// UI update depending on selected button passed as an argument
function updateUISelectingButton(button) {
    // first update the buttons

    // remove selected state from all buttons
    cardButtonElementsGlobal.forEach(clearClickedButtonState);
    // add selected state just to the clicked button
    button.classList.add("currently-selected-button");


    // next update the details divs

    // generate the class of the selected card's details element
    // for example: ".card-details-Venus" or ".card-details-Earth"
    var detailsElementIdSelector = button.id;
    var detailsElementId = "div" + detailsElementIdSelector;

    // find this element details
    var detailsElement = document.getElementById(detailsElementId);
    // remove selected state from all details elements
    var cardDetailElements = document.querySelectorAll(".card-details");
    cardDetailElements.forEach(clearCardDetailState);
    // add selected state from selected details elements
    detailsElement.style.display= "block"
}

function clearClickedButtonState(cardButtonElement) {
    cardButtonElement.classList.remove("currently-selected-button");
}

function clearCardDetailState(cardDetailElement) { console.log (cardDetailElement)
    cardDetailElement.style.display= "none"
}



