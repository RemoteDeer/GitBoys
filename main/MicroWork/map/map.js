let latitude = 51.087063;
let longtitude = 71.427878;
let zoom = 13;

var mymap = L.map('mapid').setView([latitude, longtitude], zoom);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

function onMapClick(e) {
    var marker = L.marker(e.latlng).addTo(mymap);
    marker.bindPopup(e.latlng).openPopup();
}

mymap.on('click', onMapClick);