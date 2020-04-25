// initial setup: add a listener to buttons
var cardButtonElementsGlobal = document.querySelectorAll(".card-button");
cardButtonElementsGlobal.forEach(addCardButtonListener);

// adding listener
function addCardButtonListener(cardButtonElement) {
    cardButtonElement.addEventListener("click", cardButtonClick);
}

// event handling
function cardButtonClick(event) {
    var clickedButton = event.currentTarget;

    // first update the buttons

    // remove selected state from all buttons
    cardButtonElementsGlobal.forEach(clearClickedButtonState);
    // add selected state just to the clicked button
    clickedButton.classList.add("currently-selected-button");


    // next update the details divs

    // generate the class of the selected card's details element
    // for example: ".card-details-Venus" or ".card-details-Earth"
    var detailsElementIdSelector = clickedButton.id;
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

