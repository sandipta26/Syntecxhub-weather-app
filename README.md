<div align="center">

# 🌦️ Atlas Weather

**A sleek live weather dashboard for city search, local conditions, and multi-day forecasts.**

![HTML5](https://img.shields.io/badge/HTML5-0A0A0A?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-0A0A0A?style=for-the-badge&logo=css3&logoColor=1572B6)
![JavaScript](https://img.shields.io/badge/JavaScript-0A0A0A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![OpenWeather](https://img.shields.io/badge/OpenWeather-0A0A0A?style=for-the-badge&logo=openweathermap&logoColor=FFFFFF)
![Font%20Awesome](https://img.shields.io/badge/Font%20Awesome-0A0A0A?style=for-the-badge&logo=fontawesome&logoColor=339AF0)

* Live city search with geocoding
* Current weather, hourly outlook, and 5-day forecast
* Location-based weather on first load
* Dark dashboard UI with a compact navigation rail

[Live Demo](#) • [Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 About

**Atlas Weather** is a modern weather dashboard built as a fast, single-page front end. It uses OpenWeather geocoding and forecast endpoints to show current conditions, short-term hourly data, and a five-day outlook for any city you search.

The interface is designed to feel like a focused weather control panel rather than a basic utility page. A left navigation rail, stacked content sections, and atmospheric styling make it easy to scan the weather at a glance while keeping the experience clean on desktop and mobile.

---

## ✨ Features

- ✅ Search any city and fetch live weather instantly
- ✅ Auto-detects your location on load when permission is granted
- ✅ Displays temperature, humidity, wind, sunrise, sunset, and local time
- ✅ Shows an hourly forecast for the next 24 hours
- ✅ Renders a five-day outlook with daily highs and lows
- ✅ Uses a responsive dark UI with a polished sidebar rail
- ✅ Includes dynamic state handling for loading and errors

---

## 🛠️ Tech Stack

| Category | Tools |
| --- | --- |
| **Frontend** | HTML5, CSS3, JavaScript |
| **UI Assets** | Google Fonts, Font Awesome |
| **Weather Data** | OpenWeather API |
| **Runtime** | Static browser-based app |

### Badges

![Static Badge](https://img.shields.io/badge/Frontend-HTML5%20%2B%20CSS3%20%2B%20JavaScript-0A0A0A?style=flat-square)
![Static Badge](https://img.shields.io/badge/API-OpenWeather-0A0A0A?style=flat-square)
![Static Badge](https://img.shields.io/badge/UI-Font%20Awesome%20%2B%20Google%20Fonts-0A0A0A?style=flat-square)

---

## 📁 Project Structure

```text
Syntecxhub-weather-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Quick Start

### 1) Clone the repository

```bash
git clone https://github.com/sandipta26/Syntecxhub-weather-app.git
cd syntecxhub-weather-app
```

### 2) Start a local server

```bash
python -m http.server 5500
```

### 3) Open the app

Go to `http://localhost:5500` in your browser.

If you prefer VS Code, you can also use **Live Server** to open `index.html`.

---

## ⚙️ Configuration

This project is currently a static front end and does not require environment variables.

### Optional setup notes

| Setting | Details |
| --- | --- |
| **OpenWeather API key** | Stored in `script.js` as `OPEN_WEATHER_KEY` |
| **Location access** | Optional, used to show local weather on first load |
| **Fonts / icons** | Loaded from Google Fonts and Font Awesome CDNs |

If you want to secure the API key later, move the OpenWeather calls behind a small backend proxy.

---

## 📚 Usage

1. Type a city name in the search bar and press **Search**.
2. Use the **Location** rail button to refresh your current weather.
3. Review the hero section for current conditions and local time.
4. Scroll through hourly forecasts and the five-day outlook below.

The sidebar is interactive and helps jump between the main weather sections quickly.

---

## 🔌 API Endpoints

Atlas Weather uses OpenWeather endpoints directly from the browser.

| Endpoint | Purpose |
| --- | --- |
| `https://api.openweathermap.org/geo/1.0/direct` | Converts a city name into coordinates |
| `https://api.openweathermap.org/data/2.5/weather` | Returns current weather conditions |
| `https://api.openweathermap.org/data/2.5/forecast` | Returns hourly and 5-day forecast data |

### Example flow

```javascript
// 1. Search a city
// 2. Resolve coordinates through geocoding
// 3. Fetch current weather and forecast data
// 4. Render the dashboard panels
```

---

## 📊 Project Statistics

| Metric | Value |
| --- | --- |
| Core pages | 1 |
| Main data source | OpenWeather |
| Layout mode | Responsive dashboard |
| Navigation sections | 4 |
| Frameworks used | 0 |

---

## 🐛 Troubleshooting

- If weather data does not load, confirm the OpenWeather API key in `script.js` is valid.
- If location weather does not appear, allow browser location access and refresh the page.
- If icons or fonts look broken, check that your browser can reach the external CDN assets.

---

## 🔮 Future Enhancements

- [ ] Add a secure backend proxy for the weather API key
- [ ] Add favorite cities and recent searches
- [ ] Add Celsius/Fahrenheit unit switching
- [ ] Add weather-based animations in the hero panel
- [ ] Add offline-friendly caching for recent forecasts

---

## 📄 License

This project is licensed under the **MIT License**. See the included `LICENSE` file for the full text.

---

## 👨‍💻 Author

**sandipta26**

- GitHub: [@sandipta26](https://github.com/sandipta26)
- Project: [Atlas Weather](https://github.com/sandipta26/Syntecxhub-weather-app)
- Live Demo: [Atlas Weather](https://sandipta26.github.io/Syntecxhub-weather-app/)

**Contributor**

- **LegendarySumit** guided the project and supported the implementation.
- **sandipta26** successfully completed and delivered the project.

---

<div align="center">

**🌤️ Weather made fast, clear, and focused.**

*Live data, polished visuals, and quick navigation in one dashboard.*

---

**⭐ Star this repo if you find it helpful!**

</div>