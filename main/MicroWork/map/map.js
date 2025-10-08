import data from '/GitBoys/main/MicroWork/data/data.json' with {type: 'json'};

const obj = JSON.parse(data);

let latitude = 51.087063;
let longtitude = 71.427878;
let zoom = 13;

var mymap = L.map('mapid').setView([latitude, longtitude], zoom);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

var marker = L.marker([latitude, longtitude]).addTo(mymap);
marker.bindPopup("first popup", {autoClose: true, closeOnClick: true}).openPopup();

function onMapClick(e, name, location, discription) {
    var marker = L.marker(e.latlng).addTo(mymap);
    marker.bindPopup("You clicked the map at LatLng" + e.latlng, {autoClose: true, closeOnClick: true}).openPopup();
}

for(let i = 0; i < 10; i++){
    alert(obj[i].name + " " + obj.position + " " + obj.description);
}

mymap.on('click', onMapClick);