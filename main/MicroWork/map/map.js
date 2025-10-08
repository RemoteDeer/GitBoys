let mapOptions = {
    center: [51.087023, 71.427846],
    zoom: 10
}

let map = new L.map('map', mapOptions);

let layer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}/png");
map.addLayer(layer);