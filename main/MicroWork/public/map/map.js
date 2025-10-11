// =========================================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// =========================================================

let initial_ltd = 51.087063;
let initial_lng = 71.427878;
let zoom = 13;

// Массив для хранения всех загруженных данных о местоположениях
let allLocations = [];
// Группа слоев для хранения всех маркеров на карте
let markerLayerGroup = new L.LayerGroup();

// Инициализация карты
const mymap = L.map('mapid').setView([initial_ltd, initial_lng], zoom);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

// Добавляем группу слоев на карту сразу
markerLayerGroup.addTo(mymap);


// =========================================================
// ЛОГИКА КАРТЫ И МАРКЕРОВ
// =========================================================

function initializeMarkers(locations) {
    allLocations = locations.map(location => {
        // Создаем маркер
        const marker = L.marker([location.position[0], location.position[1]])
            .bindPopup(`<b>${location.name}</b><br>${location.description}`);

        // Добавляем маркер в группу слоев
        markerLayerGroup.addLayer(marker);

        // Возвращаем объект, содержащий исходные данные и сам маркер
        return { ...location, marker: marker };
    });
}

function updateMapMarkers(filteredLocations) {
    // Очищаем текущие маркеры с карты
    markerLayerGroup.clearLayers();

    // Добавляем только отфильтрованные маркеры
    filteredLocations.forEach(location => {
        markerLayerGroup.addLayer(location.marker);
    });

    // Если есть отфильтрованные маркеры, центрируем карту
    if (filteredLocations.length > 0) {
        const firstLocation = filteredLocations[0];
        mymap.setView(firstLocation.marker.getLatLng(), zoom);
    } else {
        // Если ничего не найдено
        mymap.setView([initial_ltd, initial_lng], zoom);
    }
}
function handleSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    if (!searchInput.trim()) {
        // Если поле пустое, показываем все маркеры
        updateMapMarkers(allLocations);
        return;
    }

    // Фильтруем все местоположения по вхождению текста в название (name)
    const filtered = allLocations.filter(location =>
        location.name.toLowerCase().includes(searchInput)
    );

    updateMapMarkers(filtered);
}

// =========================================================
// ЛОГИКА ЗАГРУЗКИ ДАННЫХ
// =========================================================

function loadData() {
    // ПРЕДУПРЕЖДЕНИЕ: Путь './data/data.json' должен быть доступен
    fetch('./data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Инициализируем маркеры и сохраняем их
            initializeMarkers(data);
        })
        .catch(error => {
            console.error("Ошибка при загрузке или обработке JSON:", error);
            // Добавим маркер в центр, если данные не загрузились
            L.marker([initial_ltd, initial_lng]).addTo(mymap)
                .bindPopup("Данные не загружены. Проверьте путь к data.json.").openPopup();
        });
}

// =========================================================
// ЛОГИКА UI
// =========================================================

const filterToggle = document.getElementById('filter-toggle');
const filterPopup = document.getElementById('filter-popup');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const radiusRange = document.getElementById('radius-range');
const radiusValue = document.getElementById('radius-value');

// 1. Управление фильтром
filterToggle.addEventListener('click', () => {
    filterPopup.classList.toggle('filter-hidden');
});

// 2. Управление поиском
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// 3. Обновление значения ползунка
radiusRange.addEventListener('input', (e) => {
    radiusValue.textContent = `${e.target.value} км`;
});

// 4. Запуск загрузки данных при старте
loadData();
