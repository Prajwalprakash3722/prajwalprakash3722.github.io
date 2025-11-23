import React, { useState, useEffect } from 'react';
import { Server, Activity, Zap } from 'lucide-react';

const BeepBoopAnimation: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [beepBoop, setBeepBoop] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const beepBoopInterval = setInterval(() => {
      setBeepBoop((prev) => {
        if (prev === '') return 'beep';
        if (prev === 'beep') return 'boop';
        return '';
      });
    }, 1000);

    return () => clearInterval(beepBoopInterval);
  }, []);

  const getServerIcon = (index: number) => {
    const isActive = (frame + index) % 2 === 0;
    const icons = [Server, Activity, Zap];
    const Icon = icons[index % icons.length];

    return (
      <Icon
        key={index}
        className={`transition-all duration-300 ${
          isActive
            ? 'text-green-500 dark:text-green-400 scale-110'
            : 'text-gray-400 dark:text-gray-600'
        }`}
        size={20}
      />
    );
  };

  return (
    <div className="inline-flex items-center gap-3 font-mono text-sm select-none">
      <div className="flex gap-2">{[0, 1, 2].map((i) => getServerIcon(i))}</div>
      <div className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 bg-gray-50 dark:bg-gray-900/50">
        <span className="text-green-600 dark:text-green-400">
          {beepBoop || <span className="opacity-0">beep</span>}
        </span>
      </div>
    </div>
  );
};

export default BeepBoopAnimation;
