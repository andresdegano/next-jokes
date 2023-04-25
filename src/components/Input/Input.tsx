export default function Input({
  register,
  errors,
  label,
  name,
  ...otherProps
}: any) {
  return (
    <div className="flex flex-col">
      <div className="text-base text-md font-semibold mb-1">{label}</div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...otherProps}
        {...(register && register(name))}
      />
      {errors && errors[name] && (
        <span className="text-xs text-red-500 my-1">
          This field is required
        </span>
      )}
    </div>
  );
}
