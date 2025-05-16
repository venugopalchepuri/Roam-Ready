import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
  }>;
}

const mockWeatherData: WeatherData = {
  location: 'Leh',
  current: {
    temp: 12,
    condition: 'Partly Cloudy',
    icon: 'cloud',
  },
  forecast: [
    { date: 'Tomorrow', temp: 14, condition: 'Sunny' },
    { date: 'Day 2', temp: 13, condition: 'Cloudy' },
    { date: 'Day 3', temp: 11, condition: 'Rain' },
  ],
};

const WeatherIcon: React.FC<{ condition: string; className?: string }> = ({ condition, className }) => {
  const iconProps = { className, size: 24 };
  
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun {...iconProps} />;
    case 'rain':
      return <CloudRain {...iconProps} />;
    case 'snow':
      return <CloudSnow {...iconProps} />;
    case 'storm':
      return <CloudLightning {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};

const WeatherWidget: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">{mockWeatherData.location}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Weather</p>
          </div>
          <WeatherIcon 
            condition={mockWeatherData.current.condition} 
            className="text-primary-600 dark:text-primary-400"
          />
        </div>
        
        <div className="flex items-center mb-8">
          <span className="text-4xl font-bold">{mockWeatherData.current.temp}°C</span>
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            {mockWeatherData.current.condition}
          </span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-medium mb-4">3-Day Forecast</h4>
          <div className="grid grid-cols-3 gap-4">
            {mockWeatherData.forecast.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{day.date}</p>
                <WeatherIcon 
                  condition={day.condition} 
                  className="mx-auto mb-2 text-gray-600 dark:text-gray-400"
                />
                <p className="text-sm font-medium">{day.temp}°C</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;