import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks';
import type { WeatherData } from '../types';

const WEATHER_ICONS: Record<string, string> = {
  'Sunny': '☀️', 'Clear': '🌙', 'Partly cloudy': '⛅', 'Cloudy': '☁️',
  'Overcast': '☁️', 'Mist': '🌫️', 'Fog': '🌫️', 'Light rain': '🌦️',
  'Rain': '🌧️', 'Heavy rain': '🌧️', 'Snow': '❄️', 'Thunderstorm': '⛈️',
  'Light drizzle': '🌦️', 'Patchy rain possible': '🌦️',
};

function getIcon(desc: string) {
  return WEATHER_ICONS[desc] || '🌡️';
}

export default function WeatherWidget() {
  const [city, setCity] = useLocalStorage('dashboard-city', '');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [cityInput, setCityInput] = useState(city);

  const fetchWeather = useCallback(async (loc: string) => {
    setLoading(true);
    try {
      const q = loc || 'auto';
      const res = await fetch(`https://wttr.in/${encodeURIComponent(q)}?format=j1`);
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();
      setWeather(data);
    } catch {
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWeather(city); }, [city, fetchWeather]);

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(cityInput.trim());
    setEditing(false);
  };

  const current = weather?.current_condition?.[0];
  const area = weather?.nearest_area?.[0]?.areaName?.[0]?.value;
  const forecast = weather?.weather?.slice(0, 3);

  return (
    <div className="module">
      <h3 className="module-title">
        🌤️ 天气
        <button className="module-action" onClick={() => setEditing(!editing)}>
          {editing ? '✕' : '📍'}
        </button>
      </h3>
      {editing && (
        <form className="weather-city-form" onSubmit={handleCitySubmit}>
          <input
            type="text"
            placeholder="输入城市名 (如 Shanghai)"
            value={cityInput}
            onChange={e => setCityInput(e.target.value)}
            autoFocus
          />
          <button type="submit">确定</button>
        </form>
      )}
      {loading && !weather && <div className="module-loading">加载中...</div>}
      {current && (
        <div className="weather-current">
          <span className="weather-icon">{getIcon(current.weatherDesc[0].value)}</span>
          <span className="weather-temp">{current.temp_C}°C</span>
          <span className="weather-desc">{current.weatherDesc[0].value}</span>
          {area && <span className="weather-area">{area}</span>}
        </div>
      )}
      {forecast && (
        <div className="weather-forecast">
          {forecast.map(day => (
            <div key={day.date} className="weather-day">
              <span className="weather-day-date">{day.date.slice(5)}</span>
              <span>{day.mintempC}° ~ {day.maxtempC}°</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
