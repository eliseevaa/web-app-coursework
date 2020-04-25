// get the current time, but only the seconds
var seconds = new Date().getSeconds();
console.log(seconds);

// add the current time to the page
// (we'll discuss this properly next week)
var timeElement = document.querySelector(".time");
timeElement.textContent = seconds;
if (seconds < 20) {timeElement.classList.add("orange");}
else if (seconds > 40) {timeElement.classList.add("green");}
else {timeElement.classList.add("blue");}
