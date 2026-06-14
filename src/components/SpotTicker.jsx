import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SpotTicker = () => {
  const [prices, setPrices] = useState({
    gold: 2350.45,
    silver: 29.12,
    platinum: 980.20
  });

  const [lastPrices, setLastPrices] = useState(prices);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastPrices(prices);
      setPrices(prev => ({
        gold: prev.gold + (Math.random() - 0.5) * 2,
        silver: prev.silver + (Math.random() - 0.5) * 0.1,
        platinum: prev.platinum + (Math.random() - 0.5) * 1.5
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, [prices]);

  const PriceItem = ({ label, value, lastValue }) => {
    const diff = value - lastValue;
    const isUp = diff >= 0;

    return (
      <div className="flex items-center space-x-4 px-6 border-r border-border last:border-r-0">
        <span className="text-text-muted font-medium uppercase tracking-wider text-xs">{label}</span>
        <span className="text-sm font-bold font-mono">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className={`flex items-center text-xs ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
          {Math.abs(diff).toFixed(2)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-surface border-b border-border py-2 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
        <PriceItem label="Gold Spot" value={prices.gold} lastValue={lastPrices.gold} />
        <PriceItem label="Silver Spot" value={prices.silver} lastValue={lastPrices.silver} />
        <PriceItem label="Platinum Spot" value={prices.platinum} lastValue={lastPrices.platinum} />
        {/* Repeat for continuous marquee effect if needed, but for now simple flex is fine */}
      </div>
    </div>
  );
};

export default SpotTicker;
