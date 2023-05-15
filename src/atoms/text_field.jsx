export const TextField = ({ title, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={title}>
        {title}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={title}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={title}
      />
    </div>
  );
};
