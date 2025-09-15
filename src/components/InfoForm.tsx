import { useState } from "react";

interface InfoFormProps {
  onBack: () => void;
}

export default function InfoForm({ onBack }: InfoFormProps) {
  const [area, setArea] = useState("");
  const [slope, setSlope] = useState("");
  const [material, setMaterial] = useState("");
  const [condition, setCondition] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!area || !slope || !material || !condition || !budget) {
      alert("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-6 w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-5 animate-fade-in">
        <h2 className="font-bold text-2xl text-gray-700 mb-4">Your info has been uploaded!</h2>
        <p><strong>Roof Area:</strong> {area} m²</p>
        <p><strong>Roof Slope:</strong> {slope}°</p>
        <p><strong>Roof Material:</strong> {material}</p>
        <p><strong>Roof Condition:</strong> {condition}</p>
        <p><strong>Construction Budget:</strong> {budget}</p>
        <button
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-5 animate-fade-in">
      <h2 className="font-bold text-2xl text-gray-700 mb-4">Enter Roof Information</h2>
      
      <input
        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        placeholder="Roof Area (m²)"
        type="number"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <input
        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        placeholder="Roof Slope (°)"
        type="number"
        value={slope}
        onChange={(e) => setSlope(e.target.value)}
      />
      <select
        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
      >
        <option value="">Select Roof Material</option>
        <option value="Concrete">Concrete</option>
        <option value="Tiles">Tiles</option>
        <option value="Metal">Metal</option>
        <option value="Other">Other</option>
      </select>
      <select
        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <option value="">Roof Condition</option>
        <option value="Old">Old</option>
        <option value="New">New</option>
        <option value="Needs Repair">Needs Repair</option>
      </select>
      <input
        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        placeholder="Construction Budget"
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl shadow-md"
        onClick={handleSubmit}
      >
        Submit Info
      </button>
      <button
        className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
}
