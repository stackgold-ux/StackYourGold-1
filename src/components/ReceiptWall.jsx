import React from 'react';

const ReceiptWall = () => {
  const data = [
    { year: '1970', value: '$1,000.00', items: 'Enough for a reliable used car + rent for 6 months.', color: 'border-green-500 bg-green-500/5' },
    { year: '1995', value: '$345.00', items: 'A high-end bicycle or a nice television.', color: 'border-yellow-500 bg-yellow-500/5' },
    { year: '2026', value: '$92.00', items: 'A week of groceries for two. Maybe.', color: 'border-red-500 bg-red-500/5' },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4">
      <div className="bg-surface/30 p-8 md:p-16 border border-border rounded-3xl backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8 border-b-4 border-primary inline-block">The Receipt Wall™</h2>
          <p className="text-xl mb-12 text-text-muted font-bold uppercase tracking-widest">The Death of the Dollar (1970-2026)</p>
          
          <div className="space-y-6">
            {data.map((row) => (
              <div key={row.year} className={`p-8 rounded-2xl border-l-8 ${row.color} transition-transform hover:scale-[1.02] duration-300`}>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-4xl font-black tracking-tighter italic">{row.year}</span>
                  <span className="text-2xl font-black text-primary/80 tabular-nums">{row.value}</span>
                </div>
                <p className="text-lg text-text-main font-medium italic opacity-80">"{row.items}"</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-8 bg-primary/10 border-2 border-dashed border-primary/40 rounded-2xl text-center">
            <h3 className="text-3xl font-black text-primary mb-4 italic uppercase tracking-tighter">THE GOLD STANDARD</h3>
            <p className="text-lg font-bold text-text-main uppercase tracking-wide">
              In 1970, 1oz of Gold was $35. Today, that same ounce buys more than ever. <br/>
              <span className="text-primary mt-2 block">Paper burns. Metal lasts.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceiptWall;
