"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery() {
  const [modal, setModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const handleClick = (event: any) => {
    document.body.style.overflow = "hidden";

    setSelectedImg(event.target.src);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {modal ? (
        <section
          className='w-screen h-screen fixed top-0 left-0 bg-onyx bg-opacity-60 z-40 flex items-center justify-center'
          onClick={closeModal}
        >
          <button onClick={closeModal} className='absolute top-5 right-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10 text-onyx hover:text-azure transition duration-300 ease-in-out'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 11.414l4.95 4.95 1.414-1.414L11.414 10l4.95-4.95L14.95 3.636 10 8.586 5.05 3.636 3.636 5.05 8.586 10l-4.95 4.95 1.414 1.414L10 11.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          <Image
            src={selectedImg}
            alt='Hackathon 2019'
            width={900}
            height={900}
            quality={100}
            priority={true}
            className='rounded-2xl'
          />
        </section>
      ) : null}

      <section className='flex flex-wrap items-center justify-center gap-5 mt-10'>
        <Image
          onClick={handleClick}
          src='/images/previous-years/img-1.jpg'
          alt='Hackathon 2019'
          className='rounded-2xl cursor-pointer'
          width={500}
          height={500}
        />
        <Image
          onClick={handleClick}
          src='/images/previous-years/img-3.jpg'
          alt='Hackathon 2019'
          className='rounded-2xl cursor-pointer'
          width={500}
          height={500}
        />
        <Image
          onClick={handleClick}
          src='/images/previous-years/img-4.jpg'
          alt='Hackathon 2019'
          className='rounded-2xl cursor-pointer'
          width={500}
          height={500}
        />
        <Image
          onClick={handleClick}
          src='/images/previous-years/img-6.jpg'
          alt='Hackathon 2019'
          className='rounded-2xl cursor-pointer'
          width={500}
          height={500}
        />
        <Image
          onClick={handleClick}
          src='/images/previous-years/img-7.jpg'
          alt='Hackathon 2019'
          className='rounded-2xl cursor-pointer'
          width={500}
          height={500}
        />
        <Image
          onClick={handleClick}
          src='/images/previous-years/img-8.jpg'
          alt='Hackathon 2019'
          className='rounded-2xl cursor-pointer'
          width={500}
          height={500}
        />
        <Image
          onClick={handleClick}
          src='/images/previous-years/img-9.jpg'
          alt='Hackathon 2019'
          className='rounded-2xl cursor-pointer'
          width={500}
          height={500}
        />
      </section>
    </>
  );
}
