import React, { useState } from 'react';
import { Cpu, Activity, CheckCircle, RefreshCw } from 'lucide-react';

export const SoilSensorPanel: React.FC = () => {
  const [ph, setPh] = useState<number>(6.5);
  const [moisture, setMoisture] = useState<number>(45);
  const [nitrogen, setNitrogen] = useState<number>(120);

  // Crop Compatibility Logic
  const calculateCompatibility = () => {
    let score = 100;
    if (ph < 5.5 || ph > 7.5) score -= 20;
    if (moisture < 30 || moisture > 70) score -= 25;
    if (nitrogen < 80) score -= 15;
    return Math.max(score, 10);
  };

  const compatibilityScore = calculateCompatibility();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md my-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Live Soil Telemetry & Crop Compatibility
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time N-P-K and moisture sensor data matching.
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> Sensors Connected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sliders */}
        <div className="space-y-4 md:col-span-2">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1 dark:text-slate-300">
              <span>Soil pH Level:</span>
              <span className="text-emerald-600">{ph}</span>
            </div>
            <input
              type="range" min="4" max="9" step="0.1"
              value={ph} onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1 dark:text-slate-300">
              <span>Soil Moisture (%):</span>
              <span className="text-emerald-600">{moisture}%</span>
            </div>
            <input
              type="range" min="10" max="90" step="1"
              value={moisture} onChange={(e) => setMoisture(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1 dark:text-slate-300">
              <span>Nitrogen Level (kg/ha):</span>
              <span className="text-emerald-600">{nitrogen} N</span>
            </div>
            <input
              type="range" min="30" max="250" step="5"
              value={nitrogen} onChange={(e) => setNitrogen(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Compatibility Output Card */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between items-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Paddy Crop Success Index
          </span>
          <div className="my-2">
            <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
              {compatibilityScore}%
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {compatibilityScore > 75 ? 'Optimal Growth Conditions' : 'Soil Amendment Needed'}
            </p>
          </div>
          <button
            onClick={() => { setPh(6.5); setMoisture(45); setNitrogen(120); }}
            className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-semibold"
          >
            <RefreshCw className="w-3 h-3" /> Reset Sensors
          </button>
        </div>
      </div>
    </div>
  );
};
