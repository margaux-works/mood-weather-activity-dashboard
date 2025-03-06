# Mood-Based Weather Dashboard

## About the Project

The **Mood-Based Weather Dashboard** is a web application that suggests activities based on the user's current weather and mood. It leverages:

- Weather API (e.g., OpenWeatherMap) to fetch real-time weather data.
- User mood input to personalize activity suggestions.
- AI (OpenAI API) to recommend activities tailored to weather and mood.

Live site [here](https://margaux-works.github.io/mood-weather-activity-dashboard/)

## Features

- Fetches real-time weather data based on user location.
- Asks the user about their mood.
- Uses AI to suggest an activity suitable for the weather and mood.
- (Planned) Users can select time availability and number of participants for activity suggestions.

## Tech Stack

- **Frontend:** Vue.js, Tailwind CSS
- **APIs:** OpenWeatherMap, OpenAI API

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Vue.js](https://vuejs.org/)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/mood-weather-dashboard.git
   cd mood-weather-dashboard
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your API keys:
     ```env
     VITE_OPENWEATHER_API_KEY=your_openweather_api_key
     VITE_OPENAI_API_KEY=your_openai_api_key
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

1. Open the app in your browser.
2. Allow location access for weather data retrieval.
3. Select your mood.
4. Get AI-generated activity suggestions!

## Roadmap

- [ ] Improve UI/UX with animations and illustrations.
- [ ] Let users specify time availability and participants.

## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

## License

This project is licensed under the MIT License.
triggering deployment
