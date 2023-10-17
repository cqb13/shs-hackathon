import KeyEventCard from "@/components/home/KeyEventCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className=''>
      <section className=' h-[80vh] flex px-14'>
        <section className='font-unica-one flex flex-col justify-center'>
          <h1 className='text-white text-9xl'>SHARON HIGH</h1>
          <h1 className='text-fairy_tale text-9xl'>HACKATHON</h1>
        </section>
        <section></section>
      </section>

      <section className='bg-white flex items-center justify-center gap-10 w-full p-28 px-80'>
        {/* replace with image from hackathon */}
        <section className='w-1/2'>
          <Image
            src='/images/hackathon.jpg'
            alt='Temp hackathon image'
            className='rounded-3xl'
            width={500}
            height={500}
          />
        </section>
        <section className='flex flex-col w-1/2'>
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

      <section className='bg-azure px-80 py-28'>
        <h1 className='font-unica-one text-black text-5xl'>
          Key Event Features
        </h1>
        <section className='flex mt-14 gap-14'>
          <div className='flex flex-col gap-10'>
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
          <div className='flex flex-col gap-14'>
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
    </main>
  );
}
