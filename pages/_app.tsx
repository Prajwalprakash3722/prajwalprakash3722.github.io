/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hey !</title>
        <link rel="icon" href="/icon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Raleway:wght@500;600;700;800&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Prajwal's Personal Blog" />
        <meta
          name="keywords"
          content="blog, personal, personal blog, prajwal, dev,software, lab, self-documentation"
        />
        <meta name="author" content="PrajwalPrakash3722" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <div className="h-screen w-screen bg-[#151515] fixed inset-0 z-[-1]">
        <span className="absolute top-[-7rem] lg:top-[-80%] lg:right-[-10vw] h-[200px] w-full lg:h-[600px] lg:w-[600px] bg-gradient-to-r from-[#505bf1] to-[#EE5DB4] filter blur-[100px] opacity-25 rounded-full"></span>
        <span className="absolute bottom-[-9rem] lg:bottom-[-80%] left-[-10vw] h-[200px] w-full lg:h-[600px] lg:w-[600px] bg-gradient-to-r from-[#505bf1] to-[#EE5DB4] filter blur-[100px] opacity-25 rounded-full"></span>
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
