import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const PriceItem = ({ label, value, lastValue }) => {
  const diff = value - (lastValue || value);
  const isUp = diff >= 0;

  return (
    <div className="flex items-center space-x-4 px-6 border-r border-border last:border-r-0">
      <span className="text-text-muted font-medium uppercase tracking-wider text-xs">{label}</span>
      <span className="text-sm font-bold font-mono">
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
      </span>
      <span className={`flex items-center text-xs ${isUp ? 'text-green-500' : 'text-red-500'}`}>
        {isUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
        {Math.abs(diff).toFixed(4)}
      </span>
    </div>
  );
};

const SpotTicker = ({ spotPrices, live }) => {
  return (
    <div className="bg-surface border-b border-border py-2 overflow-hidden whitespace-nowrap">
      <div className="flex items-center animate-marquee">
        <span className={`mx-4 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${live ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
          {live ? '● Live' : '● Delayed'}
        </span>
        <PriceItem label="Gold Spot" value={spotPrices.gold} />
        <PriceItem label="Silver Spot" value={spotPrices.silver} />
        <PriceItem label="Platinum Spot" value={spotPrices.platinum} />
        {spotPrices.palladium && (
          <PriceItem label="Palladium Spot" value={spotPrices.palladium} />
        )}
      </div>
    </div>
  );
};

export default SpotTicker;
