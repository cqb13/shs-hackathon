type TextAreaProps = {
  value: string;
  placeholder: string;
  onChange: (e: any) => void;
  customClass?: string;
};

export default function TextArea({
  value,
  placeholder,
  onChange,
  customClass
}: TextAreaProps) {
  return (
    <textarea
      className={`border text-onyx border-gray-400 bg-fairy_tale-900 px-4 py-2 rounded-md outline-none ${customClass}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={10}
      cols={30}
    />
  );
}
