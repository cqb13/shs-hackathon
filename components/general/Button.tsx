type Props = {
  title: string;
  onClick: (event: any) => void;
  style: "normal" | "green" | "red";
  classModifier?: string;
};

export default function Button({
  title,
  onClick,
  style,
  classModifier,
}: Props) {
  const getStyle = (style: "normal" | "green" | "red") => {
    switch (style) {
      case "normal":
        return "bg-onyx";
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
    }
  };

  return (
    <button
      className={`text-white text-xl font-space-mono px-6 py-3 rounded-md hover:bg-opacity-95 active:tracking-wider transition-all  ${getStyle(style)}  ${
        classModifier ? classModifier : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
