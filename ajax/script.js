let currentPage = 1;
const limit = 3; // Number of cities per page
const weatherList = document.getElementById('weatherList');
const loadMoreBtn = document.getElementById('loadMore');

// Fetch weather data from JSON file
async function fetchWeather() {
  try {
    const response = await fetch('weather.json'); // your JSON file
    const data = await response.json();
    return data.cities;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return [];
  }
}

// Render cities on the page
function renderCities(cities) {
  cities.forEach(city => {
    const card = document.createElement('div');
    card.classList.add('weather-card');
    card.innerHTML = `
      <h2>${city.name}</h2>
      <p><strong>Temperature:</strong> ${city.temperature}</p>
      <p><strong>Condition:</strong> ${city.condition}</p>
      <p><strong>Humidity:</strong> ${city.humidity}</p>
      <p><strong>Wind:</strong> ${city.wind}</p>
    `;
    weatherList.appendChild(card);
  });
}

// Load more cities
async function loadCities() {
  const cities = await fetchWeather();
  const start = (currentPage - 1) * limit;
  const end = currentPage * limit;
  const paginatedCities = cities.slice(start, end);

  if (paginatedCities.length === 0) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "No more cities";
    return;
  }

  renderCities(paginatedCities);
  currentPage++;
}

loadMoreBtn.addEventListener('click', loadCities);

// Load initial cities
loadCities();
