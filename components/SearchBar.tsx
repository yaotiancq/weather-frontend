interface Props {
  city: string;
  setCity: (city: string) => void;
  days: number;
  setDays: (days: number) => void;
  fetchData: () => void;
}

export default function SearchBar({ city, setCity, days, setDays, fetchData }: Props) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        min="1"
        max="7"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded"
      />
      <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
    </div>
  );
}

