import { CurrentWeather, WeatherData, WeatherLocation } from "../types/weather";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(city: string): Promise<WeatherData> {
    const locationUrl = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;

    const locationResponse = await fetch(locationUrl);

    if (!locationResponse.ok) {
        throw new Error("No se pudo buscar la ciudad");
    }

    const locationData = await locationResponse.json();

    if (!locationData.results || locationData.results.length === 0) {
        throw new Error("No se encontró la ciudad");
    }

    const result = locationData.results[0];

    const location: WeatherLocation = {
        name: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
    };

    const weatherUrl = `${WEATHER_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
        throw new Error("No se pudo obtener el clima");
    }

    const weatherData = await weatherResponse.json();

    if (!weatherData.current) {
        throw new Error("La API no devolvió datos del clima");
    }

    const current: CurrentWeather = weatherData.current;

    return {
        location,
        current,
    };
}

export function getWeatherDescription(code: number): string {
    const descriptions: Record<number, string> = {
        0: "Mayormente despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Niebla",
        48: "Niebla con escarcha",
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna intensa",
        56: "Llovizna helada ligera",
        57: "Llovizna helada intensa",
        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        66: "Lluvia helada ligera",
        67: "Lluvia helada intensa",
        71: "Nevada ligera",
        73: "Nevada moderada",
        75: "Nevada intensa",
        77: "Granos de nieve",
        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos intensos",
        85: "Chubascos de nieve ligeros",
        86: "Chubascos de nieve intensos",
        95: "Tormenta eléctrica",
        96: "Tormenta con granizo ligero",
        99: "Tormenta con granizo intenso",
    };

    return descriptions[code] || "Código de clima desconocido";
}

export function getWeatherIcon(code: number): string {
    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "⛅";
    if (code === 3) return "☁️";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 85 && code <= 86) return "🌨️";
    if (code >= 95 && code <= 99) return "⛈️";
    return "❓";
}