export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar por marca o modelo..."
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
}