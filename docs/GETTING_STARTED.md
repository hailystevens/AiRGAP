# Getting Started with AiRGAP

This guide will help you set up and run the AiRGAP offline AI assistant.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher**: [Download Python](https://www.python.org/downloads/)
- **Node.js 16 or higher**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/downloads)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/hailystevens/AiRGAP.git
cd AiRGAP
```

### 2. Set Up the Backend

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Set Up the Web Interface

```bash
cd ../web

# Install dependencies
npm install
```

### 4. Set Up the Mobile App (Optional)

```bash
cd ../mobile

# Install dependencies
npm install

# Install Expo CLI globally (if not already installed)
npm install -g expo-cli
```

## Running the Application

### Start the Backend API

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m app.main
```

The API will run on http://localhost:8000

### Start the Web Interface

Open a new terminal:

```bash
cd web
npm start
```

The web interface will open automatically at http://localhost:3000

### Start the Mobile App

Open a new terminal:

```bash
cd mobile
npm start
```

Follow the Expo instructions to:
- Scan the QR code with the Expo Go app (iOS/Android)
- Press 'w' to run in web browser
- Press 'i' for iOS simulator
- Press 'a' for Android emulator

## Adding AI Models

1. Download your preferred AI model (e.g., from Hugging Face)
2. Place the model files in `backend/models/`
3. Update the configuration in `backend/config/settings.py` if needed

## Troubleshooting

### Backend Issues

- **Port already in use**: Change the port in `backend/config/settings.py`
- **Module not found**: Ensure virtual environment is activated and dependencies are installed

### Web Interface Issues

- **npm install fails**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- **Proxy errors**: Ensure the backend is running on port 8000

### Mobile App Issues

- **Expo errors**: Make sure you have the latest version of Expo CLI: `npm install -g expo-cli@latest`
- **Connection issues**: Use your computer's local IP address instead of localhost in `mobile/App.js`

## Next Steps

- Read the [Architecture Documentation](./ARCHITECTURE.md)
- Learn about [Model Integration](./MODEL_INTEGRATION.md)
- Check out the [API Documentation](http://localhost:8000/docs) (when backend is running)
