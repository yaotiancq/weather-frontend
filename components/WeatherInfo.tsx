interface WeatherData {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
}

interface Props {
  weatherData: WeatherData[];
}

export default function WeatherInfo({ weatherData }: Props) {
  if (weatherData.length === 0) return null;

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold">Weather Details</h2>
      <ul>
        {weatherData.map((item) => (
          <li key={item.timestamp}>
            📅 {item.timestamp}: 🌡 {item.temperature}°C | 💧 {item.humidity}% | ⏲ {item.pressure} hPa
          </li>
        ))}
      </ul>
    </div>
  );
}

