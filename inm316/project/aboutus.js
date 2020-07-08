console.log("page loaded")

// Initialize and add the map. This function gets executed when google script for embedding map finishes loading
// so we can proceed to map setup having google.maps available
function initGoogleMap() {
    console.log("map loaded")
    // set the address by providing lat and lng 
    var uluru = {lat: 51.4809440, lng:-0.1281286};

    // give map the class and set map's position
    var map = new google.maps.Map(
        document.getElementById('map2'), { zoom: 15, center: uluru });

    // adjust the map so that the marker is in the center
    var marker = new google.maps.Marker({position: uluru, map: map});
}