// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 3
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function (data) {


    function styleInfo(x) {
        return {
            color: "#000000",
            fillColor: myColor(x.geometry.coordinates[2]),
            radius: myRadius(x.properties.mag),
            opacity: 1,
            fillOpacity: 0.5,
            weight: 0.7,
            stroke: true
        };
    }

    function myColor(deep) {
        switch (true) {
            case deep > 90:
                return "#ea2c2c";
            case deep > 70:
                return "#ea82cc";
            case deep > 50:
                return "#ee9c00";
            case deep > 30:
                return "#eecc00";
            case deep > 10:
                return "#d3ee00";
            default:
                return "#98ee00";
        }

    }
    function myRadius(mag) {
        if (mag == 0) {
            return 1;
        }
        return mag * 5
    }


    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth: "
             + feature.geometry.coordinates[2] + "</br>Location: " + feature.properties.place)
            
        }
    }).addTo(myMap);




});