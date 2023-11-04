export default function KeyEventCard({
  title,
  text
}: {
  title: string;
  text: string;
}) {
  return (
    <div className='flex flex-col gap-2 max-xs:gap-2 p-3 rounded-md'>
      <h3 className='font-unica-one text-onyx-200 text-5xl px-2'>{title}</h3>
      <p className='font-space-mono text-onyx text-xl'>{text}</p>
    </div>
  );
}
