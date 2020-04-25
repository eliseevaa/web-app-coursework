// start the counter
// (we'll discuss this properly next week)
var timeElement = document.querySelector(".time");
timeElement.textContent = "0, ";

for (var counter = 1; counter <= 20; counter++) {
timeElement.textContent = timeElement.textContent + counter + ", ";
}
