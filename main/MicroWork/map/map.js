let latitude = 51.087063;
let longtitude = 71.427878;
let zoom = 13;

const mymap = L.map('mapid').setView([latitude, longtitude], zoom);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


function addMarkersToMap(locations) {
    locations.forEach(location => {
        const marker = L.marker([location.position[0], location.position[1]])
            .addTo(mymap)
            .bindPopup(`<b>${location.name}</b><br>${location.description}`).openPopup();
    });
}

function loadData() {
    fetch('./data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            addMarkersToMap(data); 
        })
        .catch(error => {
            console.error("Ошибка при загрузке или обработке JSON:", error);
        });
}

loadData();