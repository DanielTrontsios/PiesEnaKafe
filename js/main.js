var map;
var center;
var mapOptions;
var infoWindow;

var request;
var service;

function initMap() {
  navigator.geolocation.getCurrentPosition(success, failure);

  function success(position) {
    this.mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
        console.log(mapOptions);
    }
  }

  function failure() {
    this.mapOptions = {
      center: new google.maps.LatLng(37.422, -122.084058),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  }

  console.log(mapOptions);

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  request = {
    location: map.getCenter(),
    radius: '8047',
    types: ['cafe']
  };

  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);
}

function handleLocationError(browserHasGeolocation, infoWindow, center) {
  infoWindow.setPosition(center);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function callback(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK) {
    for(var i=0; i<results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLac = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  })
}
