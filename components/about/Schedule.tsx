import { Event } from "@/lib/schedule";

export default function Schedule({ schedule }: { schedule: Event[] }) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full'>
        <thead>
          <tr>
            <th className='py-2 px-4 text-left font-space-mono text-xl text-neutral-700'>
              Name
            </th>
            <th className='py-2 px-4 text-left font-space-mono text-xl text-neutral-700'>
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((event) => (
            <tr key={event.time}>
              <td className='py-2 px-4 font-space-mono text-xl text-neutral-700'>
                {event.name}
              </td>
              <td className='py-2 px-4 font-space-mono text-xl text-neutral-700'>
                {event.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
