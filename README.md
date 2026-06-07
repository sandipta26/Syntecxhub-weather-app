## SyntecxHub Weather

Short description
-----------------
A small, responsive weather app that shows current conditions using OpenWeatherMap. It includes a lightweight Node/Express proxy so the API key stays on the server.

Features
--------
- Modern, responsive UI
- Server-side API key proxy (`server.js`)
- Accessible search form, loader and error handling

Prerequisites
-------------
- Node.js (v16+ recommended)
- An OpenWeatherMap API key: https://openweathermap.org/api

Quick setup
-----------
1. Install dependencies from the project root:

```powershell
npm install
```

2. Start the local server with your API key in the environment:

PowerShell (Windows):
```powershell
$env:OPENWEATHER_API_KEY = "YOUR_API_KEY"
npm start
```

macOS / Linux (bash):
```bash
export OPENWEATHER_API_KEY="YOUR_API_KEY"
npm start
```

3. Open your browser to: http://localhost:3000

Important: do NOT open `index.html` directly with the `file://` protocol — the client calls the local `/api/weather` proxy which injects the API key.

Local-only alternative (not recommended)
--------------------------------------
If you prefer to run without the proxy, you can temporarily set the API key directly in `Myapp.js` (not for production). This will expose the key in client-side code.

Verify API key (optional)
-------------------------
To verify a key works before starting the app:

PowerShell:
```powershell
Invoke-RestMethod "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric"
```

Deployment notes
----------------
- Deploy the Node server to any Node host (Heroku, Render, Railway, etc.) and set `OPENWEATHER_API_KEY` in that host's environment variables.
- Do not commit API keys to the repository.

Security
--------
- Never commit your API key. If a key has been exposed, revoke/regenerate it at https://home.openweathermap.org/api_keys
- Use environment variables for keys in CI/CD and hosting.

Files of interest
-----------------
- `index.html` — client entry
- `Myapp.js` — client logic (calls `/api/weather`)
- `server.js` — Node/Express proxy that injects the API key from `OPENWEATHER_API_KEY`
- `style.css` — styles

Contributing
------------
- Fork → branch → PR. Keep changes small and document them.

License
-------
- MIT
