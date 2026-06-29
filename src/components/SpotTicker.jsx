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

const SpotTicker = ({ spotPrices }) => {
  return (
    <div className="bg-surface border-b border-border py-2 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
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
