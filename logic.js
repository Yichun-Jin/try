var apiKey = "pk.eyJ1Ijoic291a2FpbmEyMyIsImEiOiJjazcxM3NpYXQwMnUwM2ZtZHF2bTM0MnE3In0.ETF9QRUxFeu4A0U_9mbxrw"

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: apiKey
});

var map = L.map('map', {
    center: [
      45.52, -122.67
    ],
    zoom: 3
});

graymap.addTo(map);

var myIcon = L.icon({
  iconUrl: 'images/circle.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});

function styleInfo(feature) {
  return {
      opacity: 0.5,
      fillColor: 'red',
      color: '#000000',
      radius: getRadius(feature.properties.confirmed),
      stroke: true,
      weight: 0.5
  };
}

function getRadius(confirmed) {
  console.log(confirmed);
  if (confirmed === 0) {
      return 1;
  }
  switch(true){

    case confirmed <= 10:
      return 7;
    case confirmed <= 100:
      return 14;
  }
  return 30;
}

d3.json('corona.geojson', function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: styleInfo,

      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h4>" + feature.properties.province + "</h4> <hr> " +
            "<h6>Confirmed: " + feature.properties.confirmed + "</h6>" +
            "<h6>Deaths: " + feature.properties.deaths + "</h6>" +
            "<h6>Recovered: " + feature.properties.recovered  + "</h6>");

      }
    }).addTo(map);
  });


d3.json('countries.geojson',function(data){
  console.log(data);

  

})