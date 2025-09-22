import React, { useState, useEffect } from 'react';
import { WeatherData } from '../types';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaWind } from 'react-icons/fa';

interface WeatherFooterProps {
    cities: string[];
}

// Simple map for demonstration. A real app would need a more robust solution.
const iconMap: { [key: string]: React.ReactNode } = {
  'sol': <FaSun className="text-yellow-400" />,
  'ensolarado': <FaSun className="text-yellow-400" />,
  'claro': <FaSun className="text-yellow-400" />,
  'nuvens': <FaCloud className="text-gray-400" />,
  'nublado': <FaCloud className="text-gray-400" />,
  'chuva': <FaCloudRain className="text-blue-400" />,
  'chuvoso': <FaCloudRain className="text-blue-400" />,
  'neve': <FaSnowflake className="text-white" />,
  'vento': <FaWind className="text-gray-300" />,
};

const getIcon = (description: string): React.ReactNode => {
    const descLower = description.toLowerCase();
    for (const key in iconMap) {
        if (descLower.includes(key)) {
            return iconMap[key];
        }
    }
    return <FaCloud className="text-gray-400" />; // Default icon
}

const mockWeatherData: WeatherData[] = [
    { city: "Campinas", temperature: "24°C", description: "Ensolarado", icon: "sol" },
    { city: "Florianópolis", temperature: "21°C", description: "Parcialmente Nublado", icon: "nuvens" },
    { city: "Belo Horizonte", temperature: "26°C", description: "Céu Claro", icon: "sol" },
    { city: "Osasco", temperature: "23°C", description: "Nuvens Esparsas", icon: "nuvens" },
    { city: "Cabo Frio", temperature: "28°C", description: "Chuva Leve", icon: "chuva" },
    { city: "São Paulo", temperature: "22°C", description: "Nublado", icon: "nublado" },
    { city: "Curitiba", temperature: "18°C", description: "Chuvoso", icon: "chuva" },
    { city: "Indaiatuba", temperature: "25°C", description: "Vento", icon: "vento" },
    { city: "Maricá", temperature: "29°C", description: "Ensolarado", icon: "sol" },
    { city: "Brasília", temperature: "27°C", description: "Céu Claro", icon: "sol" },
];

export const WeatherFooter: React.FC<WeatherFooterProps> = ({ cities }) => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Using mock data as Gemini API is not suitable for real-time weather.
        // This simulates an API call.
        const timer = setTimeout(() => {
            const uniqueCities = [...new Set(cities.map(c => c.split('/')[0].split(',')[0].trim()))];
            
            const data = uniqueCities.map(city => {
                const mock = mockWeatherData.find(m => city.includes(m.city)) || {
                    city: city,
                    temperature: `${Math.floor(Math.random() * 15 + 15)}°C`,
                    description: "Nublado",
                    icon: 'nuvens'
                };
                 return { ...mock, city: city, icon: getIcon(mock.description) };
            });
            setWeatherData(data as WeatherData[]);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [cities]);
    
    const weatherItems = loading ? Array(10).fill(0).map((_, i) => (
         <div key={i} className="flex-shrink-0 w-48 bg-slate-700/50 rounded-lg p-3 text-center animate-pulse">
            <div className="h-6 bg-slate-600 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-slate-600 rounded w-1/2 mx-auto"></div>
        </div>
    )) : weatherData.map((weather) => (
        <div key={weather.city} className="flex-shrink-0 w-48 bg-slate-800/80 rounded-lg p-3 text-center">
            <h4 className="font-bold text-white truncate">{weather.city}</h4>
            <div className="flex items-center justify-center gap-2 text-2xl">
                 {weather.icon}
                <p className="text-gray-200">{weather.temperature}</p>
            </div>
            <p className="text-gray-300 text-sm">{weather.description}</p>
        </div>
    ));

    return (
       <footer className="w-full bg-slate-900 py-4 mt-8 shadow-inner">
            <div className="text-center text-white text-xs mb-3">
                <p>Previsão do tempo ilustrativa. Atualizada no carregamento da página.</p>
            </div>
            <div className="relative w-full overflow-hidden">
                <div className="flex animate-scroll hover:[animation-play-state:paused]">
                    <div className="flex space-x-4 min-w-full">
                        {weatherItems}
                    </div>
                     <div className="flex space-x-4 min-w-full" aria-hidden="true">
                        {weatherItems}
                    </div>
                </div>
            </div>
       </footer>
    );
};