const map;

var bounds = new google.maps.LatLngBounds();

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

function addMarker(lat, lon) {
  const m = new google.maps.Marker({
    position: { lat: lat, lng: lon },
    map: map
  });

  bounds.extend(m);

  map.fitBounds(bounds);
}
