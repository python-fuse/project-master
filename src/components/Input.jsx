const Input = ({ onChange, value, name, type, placeholder }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-black dark:text-white">
        {name} <span className="text-red-200">*</span>
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="outline-none border-4 focus:border-blue-500 bg-transparent rounded-lg border-gray-300 p-4 w-full"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
