interface InfoFormProps {
  onBack: () => void;
}

export default function InfoForm({ onBack }: InfoFormProps) {
  return (
    <div className="mt-6 w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-5 animate-fade-in">
      <h2 className="font-bold text-2xl text-gray-700 mb-4">Enter Roof Information</h2>
      
      <input className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" placeholder="Roof Area (m²)" type="number"/>
      <input className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" placeholder="Roof Slope (°)" type="number"/>
      <select className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
        <option value="">Select Roof Material</option>
        <option value="concrete">Concrete</option>
        <option value="tiles">Tiles</option>
        <option value="metal">Metal</option>
        <option value="other">Other</option>
      </select>
      <select className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
        <option value="">Roof Condition</option>
        <option value="concrete">Old</option>
        <option value="tiles">New</option>
        <option value="metal">Needs Repair</option>

      </select>
      <input className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" placeholder="Construction Budget" type="number"/>
      
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl shadow-md">
        Submit Info
      </button>
      <button className="mt-2 text-sm text-gray-500 hover:text-gray-700" onClick={onBack}>Back</button>
    </div>
  );
}
