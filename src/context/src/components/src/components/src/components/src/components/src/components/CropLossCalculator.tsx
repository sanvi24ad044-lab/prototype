import React, { useState } from 'react';
import { Calculator, ShieldCheck, RefreshCw } from 'lucide-react';

export const CropLossCalculator: React.FC = () => {
  const [cropType, setCropType] = useState('Paddy');
  const [totalQuantity, setTotalQuantity] = useState<number>(50);
  const [marketPrice, setMarketPrice] = useState<number>(2400);
  const [lossCause, setLossCause] = useState('unseasonal_rain');
  const [insuranceCovered, setInsuranceCovered] = useState<boolean>(true);

  const causeMultipliers: Record<string, number> = {
    unseasonal_rain: 0.22,
    pest_attack: 0.35,
    transport_delay: 0.15,
    mandi_spoilage: 0.18,
    heatwave_dehydration: 0.12
  };

  const lossPercentage = Math.min(
    Math.round((causeMultipliers[lossCause] || 0.15) * 100),
    95
  );

  const totalValue = totalQuantity * marketPrice;
  const estimatedLossAmount = (totalValue * lossPercentage) / 100;
  const recoverableAmount = insuranceCovered ? estimatedLossAmount * 0.70 : 0;
  const netFinancialImpact = estimatedLossAmount - recoverableAmount;

  return (
    <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-2xl p-6 shadow-md my-6">
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4 mb-5">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
            Smart Crop Loss & Risk Calculator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Estimate financial damage from transit, delay, pest, or weather, and calculate insurance claim recovery.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Select Commodity / Crop
            </label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="Paddy">Paddy / Rice</option>
              <option value="Arecanut">Arecanut / Supari</option>
              <option value="Coconut">Coconut</option>
              <option value="Maize">Maize / Corn</option>
              <option value="Tomato">Tomato / Perishables</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Yield (Quintals)
              </label>
              <input
                type="number"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Rate (₹ / Quintal)
              </label>
              <input
                type="number"
                value={marketPrice}
                onChange={(e) => setMarketPrice(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Primary Cause of Loss
            </label>
            <select
              value={lossCause}
              onChange={(e) => setLossCause(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="unseasonal_rain">Unseasonal Rain & High Humidity</option>
              <option value="pest_attack">Pest & Fungal Attack</option>
              <option value="transport_delay">Transit Bottleneck & Yard Delay</option>
              <option value="mandi_spoilage">Yard Storage Spoilage</option>
            </select>
          </div>

          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-medium dark:text-slate-200">PM Fasal Bima Enrolled?</span>
            </div>
            <input
              type="checkbox"
              checked={insuranceCovered}
              onChange={(e) => setInsuranceCovered(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/80 p-5 rounded-2xl border border-emerald-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Loss Calculation Result
              </span>
              <span className="px-2.5 py-1 text-xs font-extrabold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 rounded-full">
                {lossPercentage}% Estimated Damage
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm py-1 border-b border-emerald-100 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Gross Harvest Value:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹{totalValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-emerald-100 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Estimated Yield Loss:</span>
                <span className="font-bold text-red-600 dark:text-red-400">- ₹{estimatedLossAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-emerald-100 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Insurance Cover (70%):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">+ ₹{recoverableAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-dashed border-emerald-200 dark:border-slate-700 flex justify-between items-center">
            <div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Net Financial Impact</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                ₹{netFinancialImpact.toLocaleString('en-IN')}
              </div>
            </div>
            <button
              onClick={() => { setTotalQuantity(50); setMarketPrice(2400); }}
              className="p-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-slate-700 rounded-xl transition flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
