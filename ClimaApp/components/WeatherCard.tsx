import { StyleSheet, Text, View } from "react-native";
import { getWeatherDescription, getWeatherIcon } from "../services/weatherApi";
import { WeatherData } from "../types/weather";

type WeatherCardProps = {
    weather: WeatherData;
};

export default function WeatherCard({ weather }: WeatherCardProps) {
    const { location, current } = weather;

    return (
        <View style={styles.card}>
            <Text style={styles.location}>
                {" "}
                {location.name}, {location.country}{" "}
            </Text>
            <Text style={styles.icon}>{getWeatherIcon(current.weather_code)}</Text>
            <Text style={styles.temperature}>
                {" "}
                {Math.round(current.temperature_2m)}°{" "}
            </Text>
            <Text style={styles.condition}>
                {" "}
                {getWeatherDescription(current.weather_code)}{" "}
            </Text>
            <Text style={styles.feelsLike}>
                {" "}
                Sensación térmica: {Math.round(current.apparent_temperature)}°C{" "}
            </Text>

            <View style={styles.divider} />

            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>💧</Text>
                    <Text style={styles.detailLabel}>Humedad</Text>
                    <Text style={styles.detailValue}>
                        {current.relative_humidity_2m}%
                    </Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>💨</Text>
                    <Text style={styles.detailLabel}>Viento</Text>
                    <Text style={styles.detailValue}>{current.wind_speed_10m} km/h</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>☔</Text>
                    <Text style={styles.detailLabel}>Precipitación</Text>
                    <Text style={styles.detailValue}>{current.precipitation} mm</Text>
                </View>
            </View>

            <Text style={styles.dayNight}>
                {current.is_day === 1 ? "☀️  Durante el día" : "🌙  Durante la noche"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    location: {
        fontSize: 21,
        fontWeight: "700",
        color: "#1d3557",
        textAlign: "center",
    },
    icon: {
        fontSize: 80,
        marginTop: 20,
    },
    temperature: {
        fontSize: 76,
        fontWeight: "300",
        color: "#1d3557",
    },
    condition: {
        fontSize: 20,
        color: "#457b9d",
        marginTop: 4,
    },
    feelsLike: {
        fontSize: 14,
        color: "#777777",
        marginTop: 10,
    },
    divider: {
        height: 1,
        backgroundColor: "#eeeeee",
        width: "100%",
        marginVertical: 24,
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    detailItem: {
        flex: 1,
        alignItems: "center",
        gap: 6,
    },
    detailIcon: {
        fontSize: 24,
    },
    detailLabel: {
        fontSize: 12,
        color: "#777777",
        textAlign: "center",
    },
    detailValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1d3557",
    },
    dayNight: {
        fontSize: 13,
        color: "#777777",
        marginTop: 24,
    },
});