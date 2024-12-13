export default function KeyEventCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col gap-2 max-xs:gap-2 p-3 rounded-md">
      <h3 className="font-header text-onyx-200 text-5xl">{title}</h3>
      <p className="font-body text-onyx text-xl">{text}</p>
    </div>
  );
}
