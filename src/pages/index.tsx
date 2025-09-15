import { useState } from "react";
import InfoForm from "../components/InfoForm";
import ImageCapture from "../components/ImageCapture";
import DrawCanvas from "../components/DrawCanvas";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<"info" | "image" | "draw" | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 drop-shadow-sm">
        RWH/AR Assessment Tool
      </h1>

      {!selectedOption && (
        <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl">
          <button
            onClick={() => setSelectedOption("info")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg transform hover:scale-105"
          >
            Enter Information
          </button>
          <button
            onClick={() => setSelectedOption("image")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-6 rounded-xl shadow-lg transform hover:scale-105"
          >
            Put Image
          </button>
          <button
            onClick={() => setSelectedOption("draw")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg transform hover:scale-105"
          >
            Draw Rooftop
          </button>
        </div>
      )}

      {selectedOption === "info" && <InfoForm onBack={() => setSelectedOption(null)} />}
      {selectedOption === "image" && <ImageCapture onBack={() => setSelectedOption(null)} />}
      {selectedOption === "draw" && <DrawCanvas onBack={() => setSelectedOption(null)} />}
    </div>
  );
}
