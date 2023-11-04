import Image from "next/image";
import ImageGallery from "@/components/about/ImageGallery";

export default function About() {
  return (
    <main className='bg-white'>
      <section
        className='flex items-center justify-center gap-10 w-full p-28 px-28 max-lg:px-10 max-md:flex-col max-xxs:px-5'
        id='about-us'
      >
        <section className='w-1/2 max-md:w-full'>
          <Image
            src='/logo/logo-bg-none.png'
            alt='Hackathon Logo with no background (by: Maksim Straus)'
            className='rounded-3xl'
            width={500}
            height={500}
          />
        </section>
        <section className='flex flex-col w-1/2 max-md:w-full'>
          <h1 className='font-unica-one text-5xl text-onyx-200 font-bold'>
            ABOUT US
          </h1>
          {/* replace this later */}
          <article className='font-space-mono text-xl text-neutral-700'>
            Something about us
          </article>
        </section>
      </section>
      <section
        className='w-full p-28 px-20 max-lg:px-10 max-md:flex-col max-xxs:px-5'
        id='previous-years'
      >
        <h1 className='font-unica-one text-5xl text-onyx-200 font-bold'>
          Previous Years
        </h1>
        <ImageGallery />
      </section>
      <section>
        <h1 className='font-unica-one text-5xl text-onyx-200 font-bold'>
          Schedule
        </h1>
        <section className='text-neutral-700'>
          <p>
            Detailed schedule for the day (should be linked from date on home
            page)
          </p>
        </section>
      </section>
      <section>
        <h1 className='font-unica-one text-5xl text-onyx-200 font-bold'>FAQ</h1>
        <section className='text-neutral-700'>
          <p>some questions here</p>
        </section>
      </section>
    </main>
  );
}
