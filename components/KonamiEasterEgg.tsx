import React from 'react';
import { Server, Zap, Cpu, HardDrive, Activity, Terminal, Wifi } from 'lucide-react';

interface KonamiEasterEggProps {
  onClose: () => void;
}

const KonamiEasterEgg: React.FC<KonamiEasterEggProps> = ({ onClose }) => {
  const icons = [Server, Zap, Cpu, HardDrive, Activity, Terminal, Wifi];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="max-w-2xl mx-auto p-8 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="mb-8 grid grid-cols-7 gap-4 justify-center">
          {icons.map((Icon, index) => (
            <Icon
              key={index}
              size={48}
              className="text-green-400 animate-pulse"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            />
          ))}
        </div>

        <div className="font-mono text-green-400 space-y-4 mb-8">
          <div className="text-4xl font-bold mb-6 animate-pulse">SERVER MODE ACTIVATED</div>

          <div className="text-left bg-gray-900 border border-green-400 rounded-lg p-6 space-y-2 text-sm">
            <p className="text-green-300">&gt; Initializing SRE protocol...</p>
            <p className="text-green-300">&gt; Loading server configurations...</p>
            <p className="text-green-300">&gt; Connecting to infrastructure...</p>
            <p className="text-green-300">&gt; Deploying beep boop sequences...</p>
            <p className="text-yellow-400 mt-4">&gt; STATUS: All systems operational</p>
            <p className="text-green-400 font-bold">&gt; UPTIME: 99.999%</p>
          </div>

          <div className="mt-6 text-gray-400 text-xs">
            <p>You found the secret! Servers are indeed going beep boop.</p>
            <p className="mt-2">Click anywhere to close</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-mono font-bold rounded transition-colors"
        >
          EXIT SERVER MODE
        </button>
      </div>
    </div>
  );
};

export default KonamiEasterEgg;
