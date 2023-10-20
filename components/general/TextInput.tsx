type TextInputProps = {
  value: string;
  placeholder: string;
  onChange: (e: any) => void;
  customClass?: string;
};

export default function TextInput({
  value,
  placeholder,
  onChange,
  customClass
}: TextInputProps) {
  return (
    <input
      type='text'
      className={`border text-onyx border-gray-400 bg-fairy_tale-900 px-4 py-2 rounded-md outline-none ${customClass}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
