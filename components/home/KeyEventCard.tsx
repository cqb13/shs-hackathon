export default function KeyEventCard({
  title,
  text
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="font-space-mono flex flex-col gap-4 max-xs:gap-2">
      <h3 className="text-black text-2xl">{title}</h3>
      <p className="text-white">{text}</p>
    </div>
  );
}
