import React from 'react';
import { TrendingUp, TrendingDown, Store } from 'lucide-react';

export const MandiPriceTicker: React.FC = () => {
  const mandiData = [
    { crop: 'Paddy (Common)', price: '₹2,300/q', change: '+₹45', up: true },
    { crop: 'Arecanut (White)', price: '₹48,500/q', change: '+₹350', up: true },
    { crop: 'Coconut', price: '₹32/kg', change: '-₹1.5', up: false },
    { crop: 'Maize', price: '₹2,150/q', change: '+₹20', up: true },
    { crop: 'Black Pepper', price: '₹610/kg', change: '+₹12', up: true },
  ];

  return (
    <div className="bg-slate-900 text-white py-2.5 px-4 rounded-xl my-4 overflow-hidden shadow-sm flex items-center gap-4">
      <div className="flex items-center gap-1.5 shrink-0 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
        <Store className="w-3.5 h-3.5" /> Live APMC Mandi Rates
      </div>
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs">
        {mandiData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">{item.crop}:</span>
            <span className="font-bold">{item.price}</span>
            <span className={`flex items-center text-[11px] font-bold ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.up ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
