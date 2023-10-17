"use client";

import Image from "next/image";
import { Level } from "@/lib/levels";
import { useState } from "react";

export default function LevelCard({ name, description, image }: Level) {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  return (
    <section className='flex flex-col items-center gap-2 bg-blue-600 bg-opacity-50 w-72 p-5 rounded-3xl'>
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className='rounded-3xl'
      />
      <h1 className='font-unica-one text-3xl text-black'>{name}</h1>
      <p className='font-space-mono text-xl text-white text-center'>
        {descriptionExpanded ? description : description.slice(0, 25) + "..."}
      </p>
      <button
        onClick={() => setDescriptionExpanded(!descriptionExpanded)}
        className='hover:text-fairy_tale transition-all'
      >
        {descriptionExpanded ? "Show less" : "Show more"}
      </button>
    </section>
  );
}
