var map;

var bounds;

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

  bounds = new google.maps.LatLngBounds();
}

function addMarker(lat, lon) {
  console.log("lat: " + lat + ", lon: " + lon);
  if (lat === undefined || lon === undefined) {
    return;
  }
  const m = new google.maps.Marker({
    position: { lat: parseFloat(lat), lng: parseFloat(lon) },
    map: map
  });

  bounds.extend(m.getPosition());

  map.fitBounds(bounds);
}
