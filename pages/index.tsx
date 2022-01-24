import Link from "next/link";
import Image from "next/image";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="relative container w-[80%] md:w-[60%] mx-auto py-[5rem] min-h-screen">
      <div className="logo mb-12 h-16 w-16 p-1 sm:h-20 sm:w-20 rounded-full bg-gradient-to-r from flex items-center justify-center">
        <Image
          src="/prajwal.PNG"
          alt="Prajwal P"
          className="sm:h-[4.5rem] sm:w-[4.5rem] rounded-full border-2 object-cover"
          width={400}
          height={400}
        />
      </div>
      <div className="flex flex-row">
        <h1 className="text-xl sm:text-3xl text-white my-5 font-display">
          Hola, I am{" "}
          <span className="text-[#f19050] font-bold text-4xl">
            <Typewriter
              options={{
                strings: ["Prajwal Prakash", , "Prajwal P"],
                autoStart: true,
                loop: true,
                deleteSpeed: 15,
              }}
            />
          </span>
        </h1>
      </div>
      <p className="text-white sm:full lg:w-3/4 text-base sm:text-xl font-body">
        I am a{" "}
        <span className="text-[#50AEF1] font-bold">Computer Programmer</span>,
        <span className="text-[#50AEF1] font-bold"> Full Stack Developer</span>{" "}
        &&nbsp;
        <span className="text-[#50AEF1] font-bold"> Problem Solver</span>. I
        like to develop pretty sustainable solutions using latest technologies.
      </p>
      <p className="text-white sm:full lg:w-3/4 text-base sm:text-xl my-4 font-body">
        I am currently a student at&nbsp;
        <span className="text-[#50AEF1] font-bold">
          R V College Of Engineering
        </span>
        , studying&nbsp;
        <span className="text-[#50AEF1] font-bold">
          Bachelors in Computer Science Engineering
        </span>
        .
      </p>
      <div className="text-[#ecdcdc] my-8 flex bg-black rounded-lg bg-opacity-30 p-4 backdrop-filter backdrop-blur-md lg:w-1/4">
        Still in Dev Mode....
      </div>
      <div className="absolute flex bottom-0 p-4 text-center">
        <p className="text-[#bbb] font-body text-sm">
          Made using <span className="text-[#50AEF1]">Next.JS</span>,&nbsp;
          <span className="text-[#50AEF1]">Tailwind</span>,&nbsp;
          <span className="text-[#50AEF1]">TypeScript</span>
        </p>
      </div>
    </div>
  );
}
