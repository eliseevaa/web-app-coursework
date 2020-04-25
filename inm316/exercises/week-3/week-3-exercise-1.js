var timeNow = new Date().toUTCString();

console.log(timeNow);

var timeElement = document.querySelector(".time");

timeElement.textContent = timeNow;

timeElement.classList.add("orange");