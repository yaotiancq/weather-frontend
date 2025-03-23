import { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import SearchBar from '../components/SearchBar';

//  注册 chart.js 所需模块
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// 声明天气数据类型
type WeatherItem = {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
};

export default function Home() {
  const [city, setCity] = useState('San Francisco');
  const [days, setDays] = useState(3);
  const [weatherData, setWeatherData] = useState<WeatherItem[]>([]); // 添加类型

  const fetchWeatherData = async () => {
    const API_URL = `https://m0mwqniisa.execute-api.us-east-1.amazonaws.com/dev/weather/${city}?days=${days}`;
    try {
      const res = await axios.get(API_URL);
      setWeatherData(res.data);
    } catch (error) {
      console.error("获取天气数据失败: ", error);
    }
  };

  const timestamps = weatherData.map((item) => item.timestamp);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { stepSize: 5 },
      },
    },
  };

  const temperatureChart = {
    labels: timestamps,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.map((item) => item.temperature),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const humidityChart = {
    labels: timestamps,
    datasets: [
      {
        label: 'Humidity (%)',
        data: weatherData.map((item) => item.humidity),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const pressureChart = {
    labels: timestamps,
    datasets: [
      {
        label: 'Pressure (hPa)',
        data: weatherData.map((item) => item.pressure),
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-4">Weather Trends 🌤</h1>
      <SearchBar city={city} setCity={setCity} days={days} setDays={setDays} fetchData={fetchWeatherData} />

      {weatherData.length > 0 && (
        <div className="space-y-8 mt-6">
          <div className="h-60">
            <h2 className="text-xl font-semibold mb-2">Temperature</h2>
            <Line data={temperatureChart} options={chartOptions} />
          </div>
          <div className="h-60">
            <h2 className="text-xl font-semibold mb-2">Humidity</h2>
            <Line data={humidityChart} options={chartOptions} />
          </div>
          <div className="h-60">
            <h2 className="text-xl font-semibold mb-2">Pressure</h2>
            <Line data={pressureChart} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}

