export type WeatherLocation = {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
};

export type CurrentWeather = {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
};

export type WeatherData = {
    location: WeatherLocation;
    current: CurrentWeather;
};