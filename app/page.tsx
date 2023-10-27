import KeyEventCard from "@/components/home/KeyEventCard";
import ContactForm from "@/components/home/ContactForm";
import SponsorCard from "@/components/home/SponsorCard";
import LevelCard from "@/components/home/LevelCard";
import sponsors from "@/lib/sponsors";
import levels from "@/lib/levels";
import Image from "next/image";

export default function Home() {
  return (
    <main className='bg-dotted-spacing-10 bg-dotted-gray-400'>
      <section
        className='flex items-center justify-center gap-10 w-full p-28 max-lg:px-10 max-md:flex-col max-xxs:px-5 bg-white bg-opacity-60'
        id='discover'
      >
        <section className='w-1/2 max-md:w-full'>
          <Image
            src='/images/hackathon.jpg'
            alt='Temp hackathon image'
            className='rounded-3xl'
            width={500}
            height={500}
          />
        </section>
        <section className='flex flex-col w-1/2 max-md:w-full bg-white bg-opacity-70'>
          <h1 className='font-unica-one text-5xl text-onyx-200 font-bold'>
            DISCOVER
          </h1>
          <article className='font-space-mono text-xl text-neutral-700'>
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
      {/*TODO: make this look better */}
      <section className="flex items-center justify-center gap-10 p-28 bg-azure bg-opacity-5 backdrop-blur-sm">
        <h1 className="font-unica-one text-5xl text-onyx-200 font-bold">July 1, 2023</h1>
        <h1 className="font-unica-one text-5xl text-onyx-200 font-bold">Sign Up Now</h1>
      </section>
      <section
        className='px-72 py-28 max-xl:px-64 max-lg:px-20 max-md:px-10 max-xxs:px-5 bg-white bg-opacity-40'
        id='key-features'
      >
        <h1 className='font-unica-one p-4 text-onyx-200 text-5xl font-bold bg-white bg-opacity-70'>
          Key Event Features
        </h1>
        <section className='flex p-4 mt-14 gap-14 max-sm:gap-5 max-xs:flex-col max-xs:gap-2 bg-white bg-opacity-20'>
          <div className='flex flex-col gap-10 max-xs:gap-2'>
            <KeyEventCard
              title='Problem-Solving'
              text='Put your brain to the test and conquer real-world scenarios'
            />
            <KeyEventCard
              title='Skill Development'
              text='Showcase your talent and learn new tricks to sharpen your expertise'
            />
            <KeyEventCard
              title='Problem-Solving'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae'
            />
          </div>
          <div className='flex flex-col gap-10 max-xs:gap-2'>
            <KeyEventCard
              title='Teamwork'
              text='Collaborate with passionate tech enthusiasts and form lasting bonds'
            />
            <KeyEventCard
              title='Prizes'
              text='Battle it out for lucrative prizes and prestigious awards'
            />
            <KeyEventCard
              title='Problem-Solving'
              text='I think it would work better with 3 in each, but idk what to put'
            />
          </div>
        </section>
      </section>
      <section
        className='px-64 py-28 flex flex-col justify-center items-center gap-10 max-lg:px-20 max-md:px-10 max-xxs:px-5 bg-white bg-opacity-70'
        id='sponsors'
      >
        <h1 className='font-unica-one text-onyx-200 text-5xl font-bold bg-white bg-opacity-70'>
          Proud Sponsors
        </h1>
        <section className='flex gap-10 flex-wrap items-center justify-center bg-white bg-opacity-20'>
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
        className='px-64 py-28 flex flex-col justify-center items-start gap-10 max-lg:px-20 max-md:px-10 max-xxs:px-5 bg-white bg-opacity-70'
        id='contact'
      >
        <div>
          <h1 className='font-unica-one text-onyx-200 text-5xl font-bold'>
            Get in Touch
          </h1>
          <sub className='font-space-mono text-onyx text-lg'>
            shshackathon@gmail.com
          </sub>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
