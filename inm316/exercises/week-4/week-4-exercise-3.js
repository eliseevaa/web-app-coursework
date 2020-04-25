var mercuryButton = document.querySelector(".mercury");
mercuryButton.addEventListener("click", selectMercury);

var venusButton = document.querySelector(".venus");
venusButton.addEventListener("click", selectVenus);

var earthButton = document.querySelector(".earth");
earthButton.addEventListener("click", selectEarth);

function selectMercury() {
    selectPlanet("Mercury");
}
function selectVenus() {
      selectPlanet("Venus");
}
function selectEarth() {
      selectPlanet("Earth");
}
function selectPlanet(card) {
var resultElement = document.querySelector(".result");
resultElement.textContent = card;
incrementClickCounter();
}

var clickCounter = 0;

function incrementClickCounter() {
    clickCounter = clickCounter + 1;
    var clickElement = document.querySelector(".click-count");
    clickElement.textContent = clickCounter;
}

var mercuryButton = document.querySelector(".mercury");
mercuryButton.addEventListener("click", selectMercury);

var venusButton = document.querySelector(".venus");
venusButton.addEventListener("click", selectVenus);

var earthButton = document.querySelector(".earth");
earthButton.addEventListener("click", selectEarth);