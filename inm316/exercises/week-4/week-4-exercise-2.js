function addColourToPlanet(cardSelector, cardName, colour) {
    console.log("You have called addColourToPlanet() with the following parameters");
    console.log(cardSelector, cardName, colour);

var cardElement = document.querySelector(cardSelector);
cardElement.textContent = cardName;
cardElement.classList.add(colour);
}

addColourToPlanet(".mercury", "Mercury", "orange");
addColourToPlanet(".venus", "Venus", "green");
addColourToPlanet(".earth", "Earth", "blue");