export default function Input({ placeholder, disabled = false, value, setValue, type, id, className = "", ...props }) {
  return (
    <input
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`w-96 px-4 py-3 bg-transparent border border-neutral-300 rounded-lg text-neutral-900 font-medium text-base ${className}`}
      {...props}
    />
  );
}
