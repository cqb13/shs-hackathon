type ButtonProps = {
  onClick: () => void;
  customClass?: string;
  text: string;
};

export default function Button({ onClick, customClass, text }: ButtonProps) {
  return (
    <button
      className={`bg-onyx text-white text-xl font-space-mono px-6 py-3 rounded-md hover:bg-opacity-95 active:tracking-wider transition-all ${customClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
