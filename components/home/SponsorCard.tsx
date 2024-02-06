import { Sponsor } from "@/lib/sponsors";
import Image from "next/image";

export default function SponsorCard({ name, image, link }: Sponsor) {
  return (
    <section className="flex flex-col items-center justify-center gap-0">
      <Image
        src={image}
        alt={name}
        className='rounded-3xl'
        width={150}
        height={150}
      />
      <a
        href={link}
        target='_blank'
        className='text-onyx-200 text-xl text-center font-space-mono mt-10 transition-all hover:text-azure duration-150 cursor-pointer'
      >
        {name}
      </a>
    </section>
  );
}
