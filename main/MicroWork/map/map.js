let latitude = 51.087063;
let longtitude = 71.427878;
let zoom = 14;

var mymap = L.map('mapid').setView([latitude, longtitude], zoom);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

var marker = L.marker([51.087063, 71.427878]).addTo(mymap);
marker.bindPopup("<b>Hello Aslan!</b><br>It is your home, isn't it?").openPopup();