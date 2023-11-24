import { Event } from "@/lib/schedule";

export default function Schedule({ schedule }: { schedule: Event[] }) {
  return (
    <div className='flex flex-col gap-5 w-full'>
      {schedule.map((event, index) => (
        <div
          className='flex items-center justify-between gap-10 w-full'
          key={index}
        >
          <h2 className='font-space-mono text-xl text-neutral-700'>
            {event.name}
          </h2>
          <h2 className='font-space-mono text-xl text-neutral-700'>
            {event.time}
          </h2>
        </div>
      ))}
    </div>
  );
}
