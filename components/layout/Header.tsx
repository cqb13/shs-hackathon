"use client";

import {
  useLayoutContext
} from "@/lib/context/LayoutContext";

export default function Header() {
  const { title } = useLayoutContext() as { title: string };

  return (
      <header className='h-[80vh] flex px-14 max-sm:px-10 max-xxs:px-5 bg-onyx'>
        <section className='font-unica-one flex flex-col justify-center max-xxs:justify-start max-xxs:pt-20'>
          {title == "Home" ? (
            <>
              <h1 className='text-white text-9xl max-sm:text-8xl max-xs:text-7xl'>
                SHARON HIGH
              </h1>
              <h1 className='text-fairy_tale text-9xl max-sm:text-8xl max-xs:text-7xl'>
                HACKATHON
              </h1>
            </>
          ) : (
            <>
              <h1 className='text-white text-9xl max-sm:text-8xl max-xs:text-7xl'>
                {title}
              </h1>
            </>
          )}
        </section>
      </header>
  );
}
