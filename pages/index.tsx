import React, { useState } from 'react';
import Link from 'next/link';
import KonamiEasterEgg from '../components/KonamiEasterEgg';
import { useKonamiCode } from '../hooks/useKonamiCode';
/* eslint-disable @next/next/no-img-element */

export default function Home() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useKonamiCode(() => {
    setShowEasterEgg(true);
  });

  return (
    <>
      {showEasterEgg && <KonamiEasterEgg onClose={() => setShowEasterEgg(false)} />}
      <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <img
              src="https://ik.imagekit.io/tf4mccdje/prajwal_Mjvs5REg4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662013248173"
              alt="Prajwal P"
              className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-700 glitch-hover cursor-pointer"
              width={64}
              height={64}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Prajwal</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">SRE @ PhonePe</p>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <section>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              I make servers go{' '}
              <span className="text-green-600 dark:text-green-400 font-mono">beep boop</span>. Also
              a hobbyist traveller, part-time hiker, and a full-time chef. This is my personal page,
              where I post my thoughts on engineering, philosophy, and system design.
            </p>
          </section>

          <section>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Outside of work I&apos;m interested in everything *nix, open-source projects, privacy
              in tech, and infrastructure that just clicks. In my free time, I get lost in cooking,
              read the occasional book. Want to see what I&apos;m currently working on? Check out{' '}
              <Link href="/now">
                <span className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline cursor-pointer">
                  what I&apos;m up to now
                </span>
              </Link>
              .
            </p>
          </section>

          <section>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
              I believe that the world is not only made up of atoms, but it is also made up of
              stories. Each and everyone has a unique and different story—the silent struggle behind
              the story is what brings us together.
            </p>
          </section>

          <section className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
              Something interesting about me
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I wear a cyborg over my ear—I am profoundly deaf. Technology doesn&apos;t just power
              the servers I work with; it&apos;s literally part of how I navigate the world.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Food Leaderboard
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I maintain a personal leaderboard of my favorite foods from across Bengaluru/India —
              rated and ranked by taste and quality.
            </p>
            <Link href="/foods">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition cursor-pointer">
                Explore the Food Leaderboard
              </span>
            </Link>
          </section>
        </main>
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href="https://blog.devcoffee.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Blog
            </a>
            <a
              href="https://www.github.com/prajwalprakash3722"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:prajwalprakash3722@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/prajwal-prakash-a3b9931b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/Prajwal_P.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Resume
            </a>
            <a
              href="https://www.github.com/prajwalprakash3722/dotfiles"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Dotfiles
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              Built with Next.js & Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
