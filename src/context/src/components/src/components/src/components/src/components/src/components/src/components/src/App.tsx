import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { WeatherAlert } from './components/WeatherAlert';
import { MandiPriceTicker } from './components/MandiPriceTicker';
import { SoilSensorPanel } from './components/SoilSensorPanel';
import { CropLossCalculator } from './components/CropLossCalculator';

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Live Commodity Prices */}
          <MandiPriceTicker />

          {/* Real-time Weather Warning */}
          <WeatherAlert />

          {/* Soil Telemetry & Crop Compatibility */}
          <SoilSensorPanel />

          {/* Smart Crop Loss & Risk Calculator */}
          <CropLossCalculator />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
