function initMap() {
    console.log("map loaded")

    var uluru = {lat: 51.4809440, lng:-0.1281286};
    
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 15, center: uluru });
        
    var marker = new google.maps.Marker({position: uluru, map: map});
}