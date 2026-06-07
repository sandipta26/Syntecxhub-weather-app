


const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const weatherBox = document.getElementById('weatherBox');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather();
});

function showLoader() {
  weatherBox.innerHTML = `<div class="loader" aria-hidden="true"></div>`;
}

function renderWeather(data) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const rounded = Math.round(data.main.temp);
  weatherBox.innerHTML = `
    <div class="card">
      <div class="card-left">
        <img src="${iconUrl}" alt="${data.weather[0].description}">
      </div>
      <div class="card-right">
        <h2>${data.name}, ${data.sys.country}</h2>
        <p class="temp">${rounded}°C</p>
        <p class="desc">${data.weather[0].description}</p>
        <p class="meta">Humidity: ${data.main.humidity}% • Wind: ${Math.round(data.wind.speed)} m/s</p>
      </div>
    </div>
  `;
}

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;
  // If user opened index.html directly (file://), the proxy won't be available.
  if (location.protocol === 'file:') {
    weatherBox.innerHTML = `<p class="error">It looks like you're opening the file directly. Start the local server so the app can access the API proxy. See README.md for instructions.</p>`;
    return;
  }

  showLoader();

  // Call the local proxy endpoint which injects the API key from the environment
  const url = `/api/weather?city=${encodeURIComponent(city)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      weatherBox.innerHTML = `<p class="error">${data.message || 'City not found'}</p>`;
      return;
    }

    renderWeather(data);
  } catch (err) {
    // Provide actionable guidance for common problems
    weatherBox.innerHTML = `
      <div class="error">
        <strong>Cannot reach API proxy.</strong>
        <div style="margin-top:8px; font-size:14px;">
          Make sure the Node proxy is running and that you set the environment variable <code>OPENWEATHER_API_KEY</code>.
          <div style="margin-top:8px;">
            <code>npm install</code> then
            <code style="display:block; margin-top:6px">$env:OPENWEATHER_API_KEY="your_key_here"; npm start</code>
          </div>
        </div>
      </div>
    `;
  }
}

// Optional: prefill with a sample city on load
document.addEventListener('DOMContentLoaded', () => {
  cityInput.focus();
});
