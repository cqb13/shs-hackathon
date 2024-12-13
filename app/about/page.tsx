import ImageGallery from "@/components/about/ImageGallery";
import Schedule from "@/components/about/Schedule";
import FaqCard from "@/components/about/FaqCard";
import Image from "next/image";
import faqs from "@/lib/faq";

export default function About() {
  return (
    <main className="bg-white">
      <section
        className="flex items-center justify-center gap-10 w-full p-28 px-28 max-lg:px-10 max-md:flex-col max-xxs:px-5"
        id="about-us"
      >
        <section className="w-1/2 max-md:w-full">
          <Image
            src="/logo/logo-bg-none.png"
            alt="Hackathon Logo with no background (by: Maksim Straus)"
            className="rounded-3xl"
            width={500}
            height={500}
          />
        </section>
        <section className="flex flex-col w-1/2 max-md:w-full">
          <h1 className="font-header text-5xl text-onyx-200 font-bold">
            ABOUT US
          </h1>
          <article className="font-body text-xl text-neutral-700">
            The SHS Hackathon of 2025 is a day-long event proudly hosted by the
            Girls Who Code and Web Development Club at Sharon High School. Our
            mission is to bring together students with a passion for technology,
            innovation, and problem-solving.{" "}
          </article>
        </section>
      </section>
      <section
        className=" py-28 flex flex-col justify-center items-center gap-10 max-xxs:px-5"
        id="schedule"
      >
        <div className="w-full flex flex-col items-center">
          <h2 className="font-header text-onyx-200 text-5xl font-bold p-4">
            Schedule
          </h2>
          <hr className="h-0.5 w-5/12 bg-onyx border-0 rounded" />
        </div>
        <section className="flex gap-10 flex-wrap items-center justify-center">
          <Schedule />
        </section>
      </section>
      <section
        className="w-full pt-28 px-20 max-lg:px-10 max-md:flex-col max-xxs:px-5"
        id="previous-years"
      >
        <div className="w-full">
          <h2 className="font-header text-onyx-200 text-5xl font-bold p-4">
            Previous Years
          </h2>
          <hr className="h-0.5 w-5/12 bg-onyx border-0 rounded" />
        </div>
        <ImageGallery />
      </section>
      <section
        className="px-64 py-28 flex flex-col w-full gap-10 max-lg:px-20 max-md:px-10 max-xxs:px-5"
        id="faq"
      >
        <div className="w-full">
          <h2 className="font-header text-onyx-200 text-5xl font-bold p-4">
            FAQ
          </h2>
          <hr className="h-0.5 w-5/12 bg-onyx border-0 rounded" />
          <sub className="font-body text-onyx text-lg">
            Answers to some questions you might have.
          </sub>
        </div>
        <section className="flex gap-5 flex-wrap items-center justify-center">
          {faqs.map((faq, index) => (
            <FaqCard {...faq} key={index} />
          ))}
        </section>
      </section>
    </main>
  );
}
