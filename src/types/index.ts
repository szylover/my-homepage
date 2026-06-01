export interface AppItem {
  name: string;
  emoji: string;
  url: string;
  description: string;
  domain: string;
  badge: string;
}

export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export interface VmStatus {
  name: string;
  location: string;
  ip: string;
  vmStatus: string;
  v2rayPort: number;
  v2rayStatus: string;
  responseTime: number;
}

export interface StatusResponse {
  timestamp: string;
  vms: VmStatus[];
}

export interface WeatherCondition {
  temp_C: string;
  weatherDesc: { value: string }[];
  weatherIconUrl: { value: string }[];
  humidity: string;
  windspeedKmph: string;
}

export interface WeatherDay {
  date: string;
  maxtempC: string;
  mintempC: string;
  hourly: WeatherCondition[];
}

export interface WeatherData {
  current_condition: WeatherCondition[];
  weather: WeatherDay[];
  nearest_area: { areaName: { value: string }[] }[];
}

export interface RssItem {
  title: string;
  link: string;
  source: string;
  pubDate?: string;
}
