import React, { useState } from 'react';
import Link from 'next/link';

interface Trip {
  name: string;
  completed: boolean;
}

export default function Now() {
  const [showTranslation, setShowTranslation] = useState(false);
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const latinQuote = 'Amor vincit omnia';
  const translation = 'Love conquers all';

  const trips: Trip[] = [
    { name: 'Singapore', completed: true },
    { name: 'Onake Abbi Falls, Netrani Island', completed: true },
    { name: 'Kerala (Wayanad)', completed: true },
    { name: 'North India (Rishikesh, Varanasi, Delhi, Chandrashila)', completed: true },
    { name: 'Netravati Trek', completed: true },
    { name: 'Kurinjal Trek', completed: false },
    { name: 'Goa', completed: false },
    { name: 'Kuari Pass', completed: false },
    { name: 'Thailand', completed: false },
  ];

  const handleEasterEgg = () => {
    setEasterEggCount((prev) => prev + 1);
    if (easterEggCount >= 2) {
      setShowSecret(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <header className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Now</h1>
          <Link href="/">
            <span className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
              ← Back
            </span>
          </Link>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
          <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mb-4">
            &ldquo;{latinQuote}&rdquo;
          </p>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline text-sm transition-colors"
          >
            {showTranslation ? 'Hide translation' : 'Translate to English'}
          </button>
          {showTranslation && (
            <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
              &ldquo;{translation}&rdquo;
            </p>
          )}
        </div>

        {/* Easter Egg 1: Hidden message in quote box */}
        {showSecret && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8 animate-pulse">
            <p className="text-green-800 dark:text-green-200 text-sm">
              You found all the easter eggs! Here&apos;s a secret: I once accidentally brought down
              production by running data mutation commands on traffic taking node, we all are humans
              at the end of the day.
            </p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="space-y-12">
        {/* Personal */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Personal
            {/* Easter Egg 2: Hidden click counter */}
            <span
              onClick={handleEasterEgg}
              className="ml-2 text-xs cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Click me!"
            >
              ?
            </span>
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>• Perpetually learning OCI (don&apos;t ask me why)</p>
            <p>• Working on infra optimization tool at scale</p>
          </div>
        </section>

        {/* Reading */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reading</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">The Psychology of Money:</span> Timeless Lessons on
            Wealth, Greed, and Happiness
          </p>
        </section>

        {/* Playing */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Playing</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <a
              href="https://open.spotify.com/track/5CR0wsdb64LimwxRcrxtsG"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 underline transition-colors"
              onClick={handleEasterEgg}
            >
              Kaagada Doniyalli
            </a>{' '}
            on repeat
            {/* Easter Egg 3: Music note animation */}
            <span className="ml-2 animate-bounce">♪</span>
          </p>
        </section>

        {/* Trips */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Travel</h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            {trips.map((trip, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className={
                    trip.completed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 dark:text-gray-600'
                  }
                >
                  {trip.completed ? '✓' : '○'}
                </span>
                <span className={trip.completed ? 'line-through opacity-75' : ''}>{trip.name}</span>
                {trip.completed && (
                  <span className="text-xs text-gray-500 dark:text-gray-500">(completed)</span>
                )}
              </div>
            ))}
          </div>

          {/* Tech Note */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              <span className="font-semibold">Tech Setup:</span> I have set up my own NFS @ home,
              running on a minimal dual-core Intel CPU + 4TB on ZFS mirror (effectively 2TB). Each
              week, all photos from my iCloud are automatically transferred and categorized into
              year/month folders.
              {/* Easter Egg 4: Hidden tech joke */}
              <span
                onClick={handleEasterEgg}
                className="ml-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="There are only 10 types of people..."
              >
                [10]
              </span>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-500 text-xs">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </footer>
    </div>
  );
}
