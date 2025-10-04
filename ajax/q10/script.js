const cityInput = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const body = document.body;

const API_KEY = "025592fe14d549b0adc162459252209"; // Replace with your WeatherAPI key

// Fetch weather
async function searchWeather(cityName) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const condition = data.current.condition.text.toLowerCase();
    setBackground(condition);

    weatherResult.innerHTML = `
      <h2>${data.location.name}, ${data.location.country} <img src="${data.current.condition.icon}" alt="icon"></h2>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
    `;
  } catch {
    weatherResult.innerHTML = `<p>City not found!</p>`;
    body.style.background = "#121212";
  }
}

// Set background based on weather condition
function setBackground(condition) {
  if (condition.includes("sun")) body.style.background = "linear-gradient(to bottom, #fddb92, #d1fdff)";
  else if (condition.includes("cloud")) body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
  else if (condition.includes("rain") || condition.includes("drizzle")) body.style.background = "linear-gradient(to bottom, #4b79a1, #283e51)";
  else if (condition.includes("snow")) body.style.background = "linear-gradient(to bottom, #e0eafc, #cfdef3)";
  else if (condition.includes("fog") || condition.includes("mist")) body.style.background = "linear-gradient(to bottom, #3e5151, #decba4)";
  else body.style.background = "#121212";
}

// Fetch city suggestions
cityInput.addEventListener('input', async () => {
  const query = cityInput.value.trim();
  if (!query) {
    suggestions.innerHTML = '';
    return;
  }

  const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`);
  const cities = await res.json();

  suggestions.innerHTML = cities.map(city => `<div>${city.name}, ${city.region || city.country}</div>`).join('');

  Array.from(suggestions.children).forEach(div => {
    div.addEventListener('click', () => {
      cityInput.value = div.textContent.split(',')[0];
      suggestions.innerHTML = '';
      searchWeather(cityInput.value);
    });
  });
});

// Search on button click
searchBtn.addEventListener('click', () => searchWeather(cityInput.value));

// Search on Enter key
cityInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    suggestions.innerHTML = '';
    searchWeather(cityInput.value);
  }
});
