var currentPos;

// Get the client location if possible
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, failure);
  } else {
    // Geolocation not supported
    currentPos = {lat: 37.983810, lng: 23.727539};
    initMap(currentPos);
    handleLocationError(false, infoWindow, currentPos);
  }
}

//Permission for location granded
function success(position) {
  currentPos = {lat: position.coords.latitude, lng: position.coords.longitude};
  initMap(currentPos);
}

//Permission for location denied
function failure() {
  currentPos = {lat: 37.983810, lng: 23.727539};
  initMap(currentPos);
  handleLocationError(true, infoWindow, currentPos);
}

// Create the Map
function initMap(currentPos) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: currentPos,
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  request = {
    location: currentPos,
    radius: '4000',
    types: ['cafe']
  };

  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  //Request/Search for nearby shops
  service.nearbySearch(request, callback);
}

//Grab all the shops returned by the request/search
function callback(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK) {
    for(var i=0; i<results.length; i++) {
      createMarker(results[i]);
    }
  }
}

//Create the markers on the cafes
function createMarker(place) {
  var placeLac = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  //Expand shop info onclick(on the markers)
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  })
}

function handleLocationError(browserHasGeolocation, infoWindow, center) {
  infoWindow.setPosition(center);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: Geolocation permission denied.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
