# KnightJS

KnightJS is a real-time anti-phishing browser extension built for Chromium-based browsers. It helps users stay safe online by detecting and blocking potentially harmful or malicious websites.

## 🚀 Features

* 🔒 Real-time phishing detection  
* ⚠️ Automatic blocking of unsafe websites  
* 🛑 Custom blacklist support  
* 💡 Tooltip indicators for link safety  
* 🧩 Lightweight and easy to use  

## 📁 Project Structure
```
KnightJS/
│── icons/             # Extension icons
│── background.js      # Background script for handling core logic
│── content.js         # Content script for webpage interaction
│── popup.html         # Extension popup UI
│── popup.js           # Popup functionality
│── blocked.html       # Page shown when a site is blocked
│── blocked.js         # Logic for blocked page
│── blacklist.json     # List of blocked/phishing URLs
│── manifest.json      # Extension configuration
│── README.md          # Project documentation
```


## 🛠️ Installation

1. Clone the repository:

```
git clone https://github.com/5odead/KnightJS.git
```

2. Open your browser and go to:

```
chrome://extensions/
```

3. Enable **Developer Mode**

4. Click **Load unpacked** and select the project folder

## 🧠 How It Works

* Monitors visited URLs in real time  
* Compares them against a blacklist  
* Blocks access to suspicious sites  
* Displays a warning page when a threat is detected  
* Shows safety tooltips for links  

## 📌 Tech Stack

* HTML  
* JavaScript  
* Chromium Extension APIs  

## 📈 Future Improvements

* Add machine learning-based phishing detection  
* Expand threat database  
* Improve UI/UX  
* Add user reporting system  

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

## 🚀 Test The Extension on the following site:
https://extensiontester.netlify.app/
