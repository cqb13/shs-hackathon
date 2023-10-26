import Image from "next/image";

export default function ImageGallery() {
  return (
    <section className='grid grid-cols-3 gap-5 mt-10'>
      <Image
        src='/images/previous-years/img-1.jpg'
        alt='Hackathon 2019'
        className='rounded-3xl'
        width={500}
        height={500}
      />
      <Image
        src='/images/previous-years/img-3.jpg'
        alt='Hackathon 2019'
        className='rounded-3xl'
        width={500}
        height={500}
      />
      <Image
        src='/images/previous-years/img-4.jpg'
        alt='Hackathon 2019'
        className='rounded-3xl'
        width={500}
        height={500}
      />
      <Image
        src='/images/previous-years/img-6.jpg'
        alt='Hackathon 2019'
        className='rounded-3xl'
        width={500}
        height={500}
      />
      <Image
        src='/images/previous-years/img-7.jpg'
        alt='Hackathon 2019'
        className='rounded-3xl'
        width={500}
        height={500}
      />
      <Image
        src='/images/previous-years/img-8.jpg'
        alt='Hackathon 2019'
        className='rounded-3xl'
        width={500}
        height={500}
      />
      <Image
        src='/images/previous-years/img-9.jpg'
        alt='Hackathon 2019'
        className='rounded-3xl'
        width={500}
        height={500}
      />
    </section>
  );
}
