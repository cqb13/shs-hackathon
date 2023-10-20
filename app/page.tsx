import KeyEventCard from "@/components/home/KeyEventCard";
import ContactForm from "@/components/home/ContactForm";
import SponsorCard from "@/components/home/SponsorCard";
import LevelCard from "@/components/home/LevelCard";
import sponsors from "@/lib/sponsors";
import levels from "@/lib/levels";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className=' h-[80vh] flex px-14 max-sm:px-10 max-xxs:px-5'>
        <section className='font-unica-one flex flex-col justify-center max-xxs:justify-start max-xxs:pt-20'>
          <h1 className='text-white text-9xl max-sm:text-8xl max-xs:text-7xl'>
            SHARON HIGH
          </h1>
          <h1 className='text-fairy_tale text-9xl max-sm:text-8xl max-xs:text-7xl'>
            HACKATHON
          </h1>
        </section>
        <section></section>
      </section>
      <section className='bg-white flex items-center justify-center gap-10 w-full p-28 px-28 max-lg:px-10 max-md:flex-col max-xxs:px-5'>
        {/* replace with image from hackathon */}
        <section className='w-1/2 max-md:w-full'>
          <Image
            src='/images/hackathon.jpg'
            alt='Temp hackathon image'
            className='rounded-3xl'
            width={500}
            height={500}
          />
        </section>
        <section className='flex flex-col w-1/2 max-md:w-full'>
          <h1 className='font-unica-one text-5xl text-neutral-700'>DISCOVER</h1>
          {/* replace this later */}
          <p className='font-space-mono text-xl'>
            Unleash your creativity and unlock your full potential at our
            premier STEM Hackathon Event, where the worlds of technology and
            innovation collide! A hackathon is a day-long event where students
            come together to tackle complex problems through the power of STEM.
            Prepare for an electrifying experience as you embark on a thrilling
            race against the clock to craft ingenious solutions to perplexing
            problems.
          </p>
        </section>
      </section>

      {/* Schedule goes here */}

      <section className='bg-azure px-72 py-28 max-xl:px-64 max-lg:px-20 max-md:px-10 max-xxs:px-5'>
        <h1 className='font-unica-one text-black text-5xl'>
          Key Event Features
        </h1>
        <section className='flex mt-14 gap-14 max-sm:gap-5 max-xs:flex-col max-xs:gap-2'>
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
      <section className='bg-azure px-28 py-28 flex flex-col justify-center items-center gap-10 max-md:px-10 max-xxs:px-5'>
        <h1 className='font-unica-one text-black text-5xl'>Levels</h1>
        <p className='w-3/5 text-center font-space-mono text-xl text-white max-lg:w-4/5 max-md:w-full'>
          Our Hackathon caters to a diverse mix of skill levels, ensuring
          everyone gets a fair shot at glory!
        </p>
        <section className='flex gap-10 flex-wrap items-center justify-center'>
          {levels.map((level, index) => (
            <LevelCard
              name={level.name}
              description={level.description}
              image={level.image}
              key={index}
            />
          ))}
        </section>
      </section>
      <section className='bg-azure px-64 py-28 flex flex-col justify-center items-center gap-10 max-lg:px-20 max-md:px-10 max-xxs:px-5'>
        <h1 className='font-unica-one text-black text-5xl'>Proud Sponsors</h1>
        <section className='flex gap-10 flex-wrap items-center justify-center'>
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
      <section className='bg-azure px-64 py-28 flex flex-col justify-center items-start gap-10 max-lg:px-20 max-md:px-10 max-xxs:px-5'>
        <div>
          <h1 className='font-unica-one text-black text-5xl'>Get in Touch</h1>
          <sub className='font-space-mono text-onyx text-lg'>shshackathon@gmail.com</sub>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
