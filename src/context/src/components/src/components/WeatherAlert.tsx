import React, { useState } from 'react';
import { CloudRain, Sun, Wind, X, ShieldAlert } from 'lucide-react';

export const WeatherAlert: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [activeAlert, setActiveAlert] = useState(0);

  const alerts = [
    {
      id: 1,
      title: 'Unseasonal Heavy Rainfall Warning',
      region: 'Coastal & Malnad APMC Zones',
      detail: 'Possibility of high precipitation in next 36 hours. Delay harvest or secure open transport.',
      icon: CloudRain,
      color: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
    },
    {
      id: 2,
      title: 'Extreme Heatwave Alert',
      region: 'Central Mandi Belt',
      detail: 'Temperatures exceeding 40°C. Transport perishable produce early morning or night to prevent decay.',
      icon: Sun,
      color: 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
    },
    {
      id: 3,
      title: 'High Wind Velocity Alert',
      region: 'Ghat Border Routes',
      detail: 'Wind speeds up to 45 km/h reported. Check truck tarp bindings before long-distance transport.',
      icon: Wind,
      color: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300'
    }
  ];

  if (dismissed) return null;

  const current = alerts[activeAlert];
  const IconComponent = current.icon;

  return (
    <div className={`my-4 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm transition-all duration-300 ${current.color}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20 mt-0.5 sm:mt-0">
          <IconComponent className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> Live Weather Warning
            </span>
            <span className="text-xs font-semibold opacity-80">{current.region}</span>
          </div>
          <h4 className="font-bold text-sm mt-1">{current.title}</h4>
          <p className="text-xs opacity-90 mt-0.5">{current.detail}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <div className="flex gap-1">
          {alerts.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveAlert(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeAlert === index ? 'w-5 bg-emerald-600' : 'bg-gray-400 opacity-50'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
