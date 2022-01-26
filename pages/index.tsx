import Image from "next/image";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="relative container w-[80%] md:w-[60%] mx-auto py-[5rem] min-h-screen">
      <div className="logo mb-4 md:mb-12 h-24 w-24 p-1 sm:h-20 sm:w-20 rounded-full bg-gradient-to-r from flex items-center justify-center">
        <Image
          src="/prajwal.PNG"
          alt="Prajwal P"
          className="sm:h-[4.5rem] sm:w-[4.5rem] rounded-full object-cover"
          width={400}
          height={400}
        />
      </div>
      <div className="flex flex-row">
        <h1 className="text-xl sm:text-3xl text-white my-4 font-display">
          Hola, I am{" "}
          <span className="text-[#f19050] font-bold text-4xl">
            <Typewriter
              options={{
                strings: ["Prajwal Prakash", "Prajwal P"],
                autoStart: true,
                loop: true,
                deleteSpeed: 15,
              }}
            />
          </span>
        </h1>
      </div>
      <p className="text-white sm:full lg:w-3/4 text-base sm:text-xl font-body first-letter:text-2xl leading-relaxed lg:leading-1.8">
        {`I'm a`} 2nd year CSE undergrad student from&nbsp;
        <span className="text-[#50AEF1] font-bold">
          R V College Of Engineering
        </span>
        .&nbsp;I like to develop pretty sustainable solutions using latest
        technologies.&nbsp;Till now Most of my work has been in&nbsp;
        <span className="text-[#50AEF1] font-bold">Web Development</span>
        &nbsp;&&nbsp;
        <span className="text-[#50AEF1] font-bold">Backend Engineering</span>
        .&nbsp; I am very keenly interested in&nbsp;
        <span className="text-[#50AEF1] font-bold">Operating Systems</span>
        &nbsp;&&nbsp;
        <span className="text-[#50AEF1] font-bold">Data Structures</span>
        &nbsp; as of now.
      </p>

      <div className="flex flex-row justify-center items-center mt-4">
        <span className="text-[#f19050] font-bold text-ellipsis text-xl">
          <Typewriter
            options={{
              strings: [
                "Computer Programmer",
                "Full Stack Developer",
                "Problem Solver",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 15,
            }}
          />
        </span>
        &nbsp; &nbsp;
      </div>

      <div className="text-[#ecdcdc] my-8 flex bg-black rounded-lg bg-opacity-30 p-4 backdrop-filter backdrop-blur-md lg:w-1/4 justify-evenly">
        <a href="https://www.github.com/prajwalprakash3722" target="blank">
          <Image
            src="/icons/github.svg"
            alt="Github"
            className="h-8 w-8"
            width={32}
            height={32}
          />
        </a>
        <a href="mailto:prajwalprakash3722@gmail.com" target="blank">
          <Image
            src="/icons/gmail.png"
            alt="Gmail"
            className="h-8 w-8"
            width={32}
            height={32}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/prajwal-prakash-a3b9931b3/"
          target="blank"
        >
          <Image
            src="/icons/linkedin.png"
            alt="LinkedIn"
            className="h-8 w-8"
            width={32}
            height={32}
          />
        </a>
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
