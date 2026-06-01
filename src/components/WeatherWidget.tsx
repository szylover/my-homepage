import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks';
import type { WeatherData } from '../types';

const DEFAULT_CITY = 'Shanghai';
type GeoStatus = 'idle' | 'pending' | 'ready' | 'failed';
type GeoCoords = { latitude: number; longitude: number };

const WEATHER_ICONS: Record<string, string> = {
  'Sunny': '☀️', 'Clear': '🌙', 'Partly cloudy': '⛅', 'Cloudy': '☁️',
  'Overcast': '☁️', 'Mist': '🌫️', 'Fog': '🌫️', 'Light rain': '🌦️',
  'Rain': '🌧️', 'Heavy rain': '🌧️', 'Snow': '❄️', 'Thunderstorm': '⛈️',
  'Light drizzle': '🌦️', 'Patchy rain possible': '🌦️',
};

function getIcon(desc: string) {
  return WEATHER_ICONS[desc] || '🌡️';
}

function formatGeoQuery(coords: GeoCoords) {
  return `${coords.latitude},${coords.longitude}`;
}

function buildWeatherUrl(loc: string) {
  const query = /^[+-]?\d+(?:\.\d+)?,[+-]?\d+(?:\.\d+)?$/.test(loc) ? loc : encodeURIComponent(loc);
  return `https://wttr.in/${query}?format=j1`;
}

export default function WeatherWidget() {
  const [city, setCity] = useLocalStorage('dashboard-city', '');
  const manualCity = city.trim();
  const [geoStatus, setGeoStatus] = useState<GeoStatus>(manualCity ? 'idle' : 'pending');
  const [geoCoords, setGeoCoords] = useState<GeoCoords | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [cityInput, setCityInput] = useState(city);

  const fetchWeather = useCallback(async (loc: string) => {
    const res = await fetch(buildWeatherUrl(loc));
    if (!res.ok) throw new Error('Weather fetch failed');
    return res.json() as Promise<WeatherData>;
  }, []);

  useEffect(() => {
    if (manualCity) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setGeoStatus('pending');
    });

    if (typeof window === 'undefined' || !navigator.geolocation) {
      queueMicrotask(() => {
        if (!cancelled) setGeoStatus('failed');
      });
      return () => {
        cancelled = true;
      };
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        if (cancelled) return;
        setGeoCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setGeoStatus('ready');
      },
      () => {
        if (cancelled) return;
        setGeoStatus('failed');
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );

    return () => {
      cancelled = true;
    };
  }, [manualCity]);

  const weatherQuery = manualCity || (geoCoords ? formatGeoQuery(geoCoords) : geoStatus === 'failed' ? DEFAULT_CITY : '');

  useEffect(() => {
    if (!weatherQuery) return;

    let cancelled = false;

    Promise.resolve().then(async () => {
      if (cancelled) return;
      setLoading(true);
      try {
        const data = await fetchWeather(weatherQuery);
        if (!cancelled) setWeather(data);
      } catch {
        if (!cancelled) setWeather(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [weatherQuery, fetchWeather]);

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextCity = cityInput.trim();
    setCity(nextCity);
    setCityInput(nextCity);
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
