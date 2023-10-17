import Image from "next/image";
import { Sponsor } from "@/lib/sponsors";

export default function SponsorCard({ name, image, link }: Sponsor) {
  return (
    <section>
      <Image
        src={image}
        alt={name}
        className='rounded-3xl'
        width={100}
        height={100}
      />
      <a href={link} target="_blank" className='text-white text-xl font-space-mono mt-10 hover:text-fairy_tale transition-all'>
        {name}
      </a>
    </section>
  );
}
