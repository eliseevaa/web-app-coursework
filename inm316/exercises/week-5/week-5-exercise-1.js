var cardElements = document.querySelectorAll(".card");

function updatePlanet(cardElement) {
    cardElement.classList.add("orange");
}

cardElements.forEach(updatePlanet);