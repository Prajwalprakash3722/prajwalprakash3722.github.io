/* eslint-disable @next/next/no-page-custom-font */
import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import CursorTrail from '../components/CursorTrail';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Prajwal - SRE, Traveller, Chef</title>
        <link rel="icon" href="/icon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Raleway:wght@500;600;700;800&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="I make servers go beep boop. SRE, traveller, hiker, chef. Thoughts on engineering, philosophy, and system design."
        />
        <meta
          name="keywords"
          content="SRE, site reliability engineering, engineering, philosophy, system design, travel, hiking, cooking, open source, unix, privacy, infrastructure"
        />
        <meta name="author" content="Prajwal" />
      </Head>
      <CursorTrail />
      {/* @ts-ignore */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-white dark:bg-black transition-colors">
          <div className="fixed inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 opacity-50"></div>
          <div className="relative z-10">
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
