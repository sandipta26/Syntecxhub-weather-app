# 🌦️ SyntecxHub Weather

A small, responsive weather application that displays real-time weather conditions using the OpenWeatherMap API. The project includes a secure Node.js/Express proxy server to keep your API key hidden from the client side.

---

## 🚀 Features

* Modern and responsive user interface
* Real-time weather data from OpenWeatherMap
* Secure server-side API key handling (`server.js`)
* City-based weather search
* Loading indicators and error handling
* Mobile-friendly design
* Clean and accessible user experience

---

## 📋 Prerequisites

Before running this project, make sure you have:

* Node.js (v16 or higher)
* npm (comes with Node.js)
* OpenWeatherMap API Key: https://openweathermap.org/api

---

## ⚙️ Installation

Clone the repository and install dependencies:

```powershell
git clone https://github.com/YOUR_USERNAME/SyntecxHub-Weather.git
cd SyntecxHub-Weather
npm install
```

---

## ▶️ Run the Application (Recommended)

### Windows PowerShell

```powershell
$env:OPENWEATHER_API_KEY="YOUR_API_KEY"
npm start
```

### macOS / Linux

```bash
export OPENWEATHER_API_KEY="YOUR_API_KEY"
npm start
```

After starting the server, open:

```text
http://localhost:3000
```

---

## ⚡ Quick Local-Only Setup (Not Recommended)

If you don't want to run the Express server, you can temporarily place your OpenWeatherMap API key directly inside `Myapp.js`.

⚠️ This is only suitable for testing and should never be used in production.

---

## 🔑 Verify Your API Key (Optional)

### PowerShell

```powershell
Invoke-RestMethod "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric"
```

If valid, weather data for London will be returned.

---

## 📁 Project Structure

```text
SyntecxHub-Weather/
│
├── index.html        # Main HTML page
├── Myapp.js          # Client-side weather logic
├── style.css         # Application styling
├── server.js         # Express proxy server
├── package.json      # Project dependencies
└── README.md         # Documentation
```

---

## 📂 Files of Interest

| File         | Description                             |
| ------------ | --------------------------------------- |
| `index.html` | Client entry point                      |
| `Myapp.js`   | Handles weather requests and UI updates |
| `server.js`  | Secure API proxy using Express          |
| `style.css`  | Application styling                     |

---

## 🛠️ Development Notes

* Never commit API keys to GitHub.
* Use environment variables for secrets.
* Run `npm install` after cloning.
* Restart the server after modifying `server.js`.
* Use browser developer tools for debugging client-side code.

---

## 🌐 Deployment

You can deploy this project on:

* Render
* Railway
* Heroku
* Vercel (Server Functions)
* Any Node.js hosting platform

### Deployment Checklist

* Set `OPENWEATHER_API_KEY` as an environment variable.
* Add `node_modules` to `.gitignore`.
* Never push API keys to GitHub.
* Test API routes before deployment.

---

## 🔒 Security

If your API key is accidentally exposed:

1. Visit: https://home.openweathermap.org/api_keys
2. Revoke the compromised key.
3. Generate a new API key.
4. Update your environment variables.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

Please keep commits focused and well documented.

---

## 📜 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute this project.
 
