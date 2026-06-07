const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const statusBar = document.getElementById('statusBar');
const heroPanel = document.getElementById('heroPanel');
const currentLabel = document.getElementById('currentLabel');
const currentCity = document.getElementById('currentCity');
const currentDescription = document.getElementById('currentDescription');
const currentTemp = document.getElementById('currentTemp');
const currentIcon = document.getElementById('currentIcon');
const emptyIcon = document.getElementById('emptyIcon');
const chanceOfRain = document.getElementById('chanceOfRain');
const lastUpdated = document.getElementById('lastUpdated');
const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');
const localTime = document.getElementById('localTime');
const forecastRegion = document.getElementById('forecastRegion');
const dailyForecast = document.getElementById('dailyForecast');
const hourlyForecast = document.getElementById('hourlyForecast');
const statsGrid = document.getElementById('statsGrid');
const weatherGlow = document.getElementById('weatherGlow');
const railItems = Array.from(document.querySelectorAll('.rail-item'));

const OPEN_WEATHER_KEY = 'aa0d78a427e2d9183de847a2320f34f0';
const ICON_BASE = 'https://openweathermap.org/img/wn';
const CITY_SEARCH_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

let requestId = 0;

function toTitleCase(text) {
  return text
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatCityTime(timestamp, timezoneOffset) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(new Date((timestamp + timezoneOffset) * 1000));
}

function formatCityDate(timestamp, timezoneOffset) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date((timestamp + timezoneOffset) * 1000));
}

function formatLocalDateTime(timestamp, timezoneOffset) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  }).format(new Date((timestamp + timezoneOffset) * 1000));
}

function buildIconUrl(iconCode) {
  return `${ICON_BASE}/${iconCode}@4x.png`;
}

function updateStatus(message) {
  statusBar.textContent = message;
}

function setLoadingState(isLoading) {
  [heroPanel, dailyForecast, hourlyForecast, statsGrid].forEach((node) => {
    node.classList.toggle('loading-state', isLoading);
  });
}

function renderEmptyState(message) {
  dailyForecast.innerHTML = `<div class="forecast-empty">${message}</div>`;
  hourlyForecast.innerHTML = `<div class="forecast-empty">${message}</div>`;
  statsGrid.innerHTML = `<div class="forecast-empty">${message}</div>`;
}

function applyTheme(weatherMain) {
  document.body.className = '';
  document.body.classList.add(`weather-${weatherMain.toLowerCase()}`);

  const accentMap = {
    Clear: 'radial-gradient(circle, rgba(255, 210, 88, 0.24), transparent 66%)',
    Clouds: 'radial-gradient(circle, rgba(157, 196, 255, 0.24), transparent 66%)',
    Rain: 'radial-gradient(circle, rgba(97, 198, 255, 0.26), transparent 66%)',
    Drizzle: 'radial-gradient(circle, rgba(97, 198, 255, 0.26), transparent 66%)',
    Thunderstorm: 'radial-gradient(circle, rgba(166, 121, 255, 0.24), transparent 66%)',
    Snow: 'radial-gradient(circle, rgba(220, 244, 255, 0.24), transparent 66%)',
    Mist: 'radial-gradient(circle, rgba(197, 210, 225, 0.22), transparent 66%)',
    Fog: 'radial-gradient(circle, rgba(197, 210, 225, 0.22), transparent 66%)',
    Haze: 'radial-gradient(circle, rgba(197, 210, 225, 0.22), transparent 66%)',
  };

  weatherGlow.style.background = accentMap[weatherMain] || accentMap.Clear;
}

function weatherDescriptionList(weather) {
  return weather.map((item) => toTitleCase(item.description)).join(', ');
}

function setHeroContent(current, forecast, displayLabel) {
  const weather = current.weather?.[0] || {};
  const main = weather.main || 'Clear';
  const iconCode = weather.icon || '01d';
  const timezoneOffset = current.timezone || 0;
  const rainChance = forecast.list?.slice(0, 8).reduce((highest, entry) => Math.max(highest, entry.pop ?? 0), 0) || 0;
  const cityName = displayLabel || current.name || 'Current location';
  const description = weatherDescriptionList(current.weather || [{ description: 'clear sky' }]);
  const updatedAt = current.dt ? formatLocalDateTime(current.dt, timezoneOffset) : 'Just updated';

  currentLabel.textContent = displayLabel ? `Live weather for ${displayLabel}` : 'Live weather update';
  currentCity.textContent = `${cityName}${current.sys?.country ? `, ${current.sys.country}` : ''}`;
  currentDescription.textContent = `${description} with ${Math.round(current.main?.humidity ?? 0)}% humidity and ${Math.round(current.wind?.speed ?? 0)} m/s winds.`;
  currentTemp.textContent = `${Math.round(current.main?.temp ?? 0)}°`;
  chanceOfRain.textContent = `Chance of rain ${Math.round(rainChance * 100)}%`;
  lastUpdated.textContent = `Updated ${updatedAt}`;
  sunriseTime.textContent = `Sunrise ${current.sys?.sunrise ? formatCityTime(current.sys.sunrise, timezoneOffset) : '--'}`;
  sunsetTime.textContent = `Sunset ${current.sys?.sunset ? formatCityTime(current.sys.sunset, timezoneOffset) : '--'}`;
  localTime.textContent = `Local time ${current.dt ? formatCityTime(current.dt, timezoneOffset) : '--'}`;
  forecastRegion.textContent = current.sys?.country ? `${current.sys.country} forecast` : 'Forecast';

  currentIcon.src = buildIconUrl(iconCode);
  currentIcon.alt = weather.description || 'Current weather icon';
  currentIcon.hidden = true;
  emptyIcon.hidden = false;

  applyTheme(main);
}

function renderHourlyForecast(forecast, timezoneOffset) {
  const items = forecast.list.slice(0, 8);

  hourlyForecast.innerHTML = items.map((entry) => {
    const time = formatCityTime(entry.dt, timezoneOffset);
    const temp = Math.round(entry.main.temp);
    const label = toTitleCase(entry.weather?.[0]?.description || 'Weather');
    const icon = entry.weather?.[0]?.icon || '01d';

    return `
      <article class="hour-card">
        <time datetime="${new Date(entry.dt * 1000).toISOString()}">${time}</time>
        <img src="${buildIconUrl(icon)}" alt="${label}">
        <strong>${temp}°</strong>
        <span>${label}</span>
      </article>
    `;
  }).join('');
}

function groupForecastByDay(forecast, timezoneOffset) {
  const grouped = new Map();

  forecast.list.forEach((entry) => {
    const shifted = new Date((entry.dt + timezoneOffset) * 1000);
    const dayKey = shifted.toISOString().slice(0, 10);

    if (!grouped.has(dayKey)) {
      grouped.set(dayKey, []);
    }

    grouped.get(dayKey).push(entry);
  });

  return [...grouped.entries()].slice(0, 5);
}

function renderDailyForecast(forecast) {
  const timezoneOffset = forecast.city?.timezone || 0;
  const days = groupForecastByDay(forecast, timezoneOffset);

  dailyForecast.innerHTML = days.map(([key, entries], index) => {
    const dayEntries = entries.filter(Boolean);
    const high = Math.round(Math.max(...dayEntries.map((entry) => entry.main.temp_max)));
    const low = Math.round(Math.min(...dayEntries.map((entry) => entry.main.temp_min)));
    const middayEntry = dayEntries[Math.floor(dayEntries.length / 2)] || dayEntries[0];
    const icon = middayEntry.weather?.[0]?.icon || '01d';
    const label = toTitleCase(middayEntry.weather?.[0]?.description || 'Weather');
    const dayText = formatCityDate(middayEntry.dt, timezoneOffset);

    return `
      <article class="forecast-row">
        <div class="forecast-day-meta">
          <strong>${index === 0 ? 'Today' : dayText}</strong>
          <small>${entries.length} forecasts</small>
        </div>
        <img src="${buildIconUrl(icon)}" alt="${label}">
        <div><span>${label}</span></div>
        <div class="forecast-temp">${high}° / ${low}°</div>
      </article>
    `;
  }).join('');
}

function renderStats(current) {
  const weather = current.weather?.[0] || {};
  const visibilityKm = current.visibility ? (current.visibility / 1000).toFixed(1) : '0';
  const rainChance = current.rain?.['1h'] ? `${current.rain['1h']} mm` : '0 mm';
  const pressure = `${Math.round(current.main?.pressure ?? 0)} hPa`;
  const humidity = `${Math.round(current.main?.humidity ?? 0)}%`;
  const wind = `${(current.wind?.speed ?? 0).toFixed(1)} m/s`;
  const clouds = `${Math.round(current.clouds?.all ?? 0)}%`;
  const feelsLike = `${Math.round(current.main?.feels_like ?? 0)}°`;

  statsGrid.innerHTML = [
    { label: 'Feels like', value: feelsLike, sub: `Compared with ${Math.round(current.main?.temp ?? 0)}° actual` },
    { label: 'Humidity', value: humidity, sub: 'Moisture in the air' },
    { label: 'Wind', value: wind, sub: weather.main || 'Weather conditions' },
    { label: 'Pressure', value: pressure, sub: 'Surface air pressure' },
    { label: 'Visibility', value: `${visibilityKm} km`, sub: 'Current visibility range' },
    { label: 'Rain now', value: rainChance, sub: 'Measured precipitation' },
    { label: 'Cloud cover', value: clouds, sub: 'Sky cover at the moment' },
    { label: 'Condition', value: toTitleCase(weather.description || 'Clear sky'), sub: 'Live OpenWeather reading' },
  ].map((item) => `
      <article class="metric-card">
        <div class="metric-label">${item.label}</div>
        <div class="metric-value">${item.value}</div>
        <div class="metric-sub">${item.sub}</div>
      </article>
    `).join('');
}

async function fetchJson(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Unable to fetch weather data.');
  }

  return data;
}

async function loadWeatherByCoordinates(lat, lon, label = 'Current location') {
  const currentUrl = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`;
  const forecastUrl = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`;

  const [current, forecast] = await Promise.all([fetchJson(currentUrl), fetchJson(forecastUrl)]);
  setHeroContent(current, forecast, label);
  renderHourlyForecast(forecast, forecast.city?.timezone || current.timezone || 0);
  renderDailyForecast(forecast);
  renderStats(current);
  updateStatus(`Showing live weather for ${label}.`);
}

async function loadWeatherForCity(city) {
  const geoUrl = `${CITY_SEARCH_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${OPEN_WEATHER_KEY}`;
  const results = await fetchJson(geoUrl);

  if (!results.length) {
    throw new Error('No matching city found. Try a different spelling or add the country.');
  }

  const [location] = results;
  await loadWeatherByCoordinates(location.lat, location.lon, toTitleCase(city));
}

function showLoading(message) {
  updateStatus(message);
  setLoadingState(true);
  renderEmptyState('Loading live weather data...');
}

function clearLoading() {
  setLoadingState(false);
}

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    updateStatus('Enter a city name to fetch live weather data.');
    return;
  }

  const currentRequest = ++requestId;
  showLoading(`Fetching live weather for ${city}...`);

  try {
    await loadWeatherForCity(city);
  } catch (error) {
    if (currentRequest !== requestId) return;

    dailyForecast.innerHTML = `<div class="error-state"><strong>Weather data could not be loaded.</strong><br>${error.message}</div>`;
    hourlyForecast.innerHTML = `<div class="error-state"><strong>Hourly forecast unavailable.</strong><br>${error.message}</div>`;
    statsGrid.innerHTML = `<div class="error-state"><strong>Metrics unavailable.</strong><br>${error.message}</div>`;
    currentLabel.textContent = 'Search failed';
    currentCity.textContent = 'Try another city';
    currentDescription.textContent = error.message;
    currentTemp.textContent = '--°';
    currentIcon.hidden = true;
    emptyIcon.hidden = false;
    chanceOfRain.textContent = 'Chance of rain --%';
    lastUpdated.textContent = 'No update available';
    sunriseTime.textContent = 'Sunrise --';
    sunsetTime.textContent = 'Sunset --';
    localTime.textContent = 'Local time --';
    forecastRegion.textContent = 'No forecast';
    updateStatus(error.message);
  } finally {
    if (currentRequest === requestId) {
      clearLoading();
    }
  }
}

async function loadInitialLocation() {
  if (!navigator.geolocation) {
    updateStatus('Search any city to load live weather data.');
    renderEmptyState('Search for a city to populate the dashboard.');
    return;
  }

  updateStatus('Using your location to load live weather data...');

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const currentRequest = ++requestId;
      showLoading('Loading your local weather...');

      try {
        await loadWeatherByCoordinates(position.coords.latitude, position.coords.longitude, 'Your location');
      } catch (error) {
        if (currentRequest === requestId) {
          updateStatus(error.message);
          renderEmptyState(error.message);
        }
      } finally {
        if (currentRequest === requestId) {
          clearLoading();
        }
      }
    },
    () => {
      updateStatus('Location access declined. Search any city to continue.');
      renderEmptyState('Search for a city to populate the dashboard.');
    },
    { timeout: 6000, maximumAge: 600000 },
  );
}

function setActiveRailItem(activeItem) {
  railItems.forEach((item) => {
    const isActive = item === activeItem;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setActiveRailItem(railItems.find((item) => item.dataset.view === sectionId) || null);
}

railItems.forEach((item) => {
  item.addEventListener('click', () => {
    const { view, action } = item.dataset;
    setActiveRailItem(item);

    if (view) {
      scrollToSection(view);
      return;
    }

    if (action === 'search') {
      cityInput.focus();
      cityInput.select();
      updateStatus('Type a city, then press Search to load live weather data.');
      return;
    }

    if (action === 'location') {
      if (!navigator.geolocation) {
        updateStatus('Location access is not available in this browser.');
        return;
      }

      updateStatus('Refreshing your current location weather...');
      loadInitialLocation();
    }
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  setActiveRailItem(railItems.find((item) => item.dataset.action === 'search') || null);
  getWeather();
});

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    cityInput.blur();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  cityInput.focus();
  loadInitialLocation();
});
