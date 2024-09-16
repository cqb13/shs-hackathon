import KeyEventCard from "@/components/home/KeyEventCard";
import ContactForm from "@/components/home/ContactForm";
import SponsorCard from "@/components/home/SponsorCard";
import sponsors from "@/lib/sponsors";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-azure bg-opacity-5">
      <section
        className="flex items-center justify-center gap-10 w-full p-28 max-lg:px-10 max-md:flex-col max-xxs:px-5"
        id="discover"
      >
        <section className="w-1/2 max-md:w-full">
          <Image
            src="/images/hackathon.jpg"
            alt="Temp hackathon image"
            className="rounded-3xl"
            width={500}
            height={500}
          />
        </section>
        <section className="flex flex-col w-1/2 max-md:w-full">
          <h2 className="font-unica-one text-5xl text-onyx-200 font-bold">
            DISCOVER
          </h2>
          <article className="font-space-mono text-xl text-neutral-700">
            Unleash your creativity and unlock your full potential at our
            premier STEM Hackathon Event, where the worlds of technology and
            innovation collide! A hackathon is a day-long event where students
            come together to tackle complex problems through the power of STEM.
            Prepare for an electrifying experience as you embark on a thrilling
            race against the clock to craft ingenious solutions to perplexing
            problems.
          </article>
        </section>
      </section>
      <section className="flex flex-col items-center gap-20 py-10 backdrop-blur-sm text-onyx-200 max-lsm:py-0">
        <hr className=" h-0.5 w-9/12 bg-onyx border-0 rounded" />
        <div className="flex items-center justify-center gap-10 max-lsm:flex-col max-lsm:gap-2">
          <h2 className="font-unica-one text-5xl font-bold max-xxs:text-center">
            Date: TBD
          </h2>
          {/* 
          <a
            className="font-unica-one text-5xl font-bold text-shadow-lg shadow-azure hover:text-azure cursor-pointer transition-all duration-150"
            href="https://docs.google.com/forms/d/1VkHAdF7eaMKsglVRdF1nhJtwhSHoe48okImXVRWGW0Q/viewform?ts=65970a9f&edit_requested=true"
          >
            Sign Up Now
          </a>
          */}
        </div>
        <hr className="h-0.5 w-9/12 bg-onyx border-0 rounded" />
      </section>
      <section
        className="px-72 py-28 max-xl:px-64 max-lg:px-20 max-md:px-10 max-xxs:px-5"
        id="key-features"
      >
        <section className="flex p-4 mt-14 gap-5 max-sm:flex-col max-sm:gap-2">
          <div className="flex flex-col gap-5 max-sm:gap-2">
            <KeyEventCard
              title="Problem-Solving"
              text="Put your brain to the test and conquer real-world scenarios"
            />
            <KeyEventCard
              title="Skill Development"
              text="Showcase your talent and learn new tricks to sharpen your expertise"
            />
          </div>
          <div className="flex flex-col gap-5 max-sm:gap-2">
            <KeyEventCard
              title="Teamwork"
              text="Collaborate with passionate tech enthusiasts and form lasting bonds"
            />
            <KeyEventCard
              title="Prizes"
              text="Battle it out for lucrative prizes and prestigious awards"
            />
          </div>
        </section>
      </section>
      <section
        className="px-64 py-28 flex flex-col justify-center items-center gap-10 max-lg:px-20 max-md:px-10 max-xxs:px-5"
        id="sponsors"
      >
        <div className="w-full flex flex-col items-center">
          <h2 className="font-unica-one text-onyx-200 text-center text-5xl font-bold p-4">
            Proud Sponsors
          </h2>
          <hr className="h-0.5 w-5/12 bg-onyx border-0 rounded max-md:w-7/12 max-sm:w-9/12 max-xxs:w-11/12" />
        </div>
        <section className="flex gap-10 flex-wrap items-center justify-center">
          {sponsors.map((sponsor, index) => (
            <SponsorCard
              name={sponsor.name}
              image={sponsor.image}
              link={sponsor.link}
              key={index}
            />
          ))}
        </section>
      </section>
      <section
        className="px-64 py-28 flex flex-col justify-center items-start gap-10 max-lg:px-20 max-md:px-10 max-xxs:px-5"
        id="contact"
      >
        <div className="w-full">
          <h2 className="font-unica-one text-onyx-200 text-5xl font-bold p-4">
            Get in Touch
          </h2>
          <hr className="h-0.5 w-5/12 bg-onyx border-0 rounded max-md:w-7/12 max-sm:w-9/12 max-xxs:w-11/12" />
          <sub className="font-space-mono text-onyx text-lg">
            shshackathon@gmail.com
          </sub>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
