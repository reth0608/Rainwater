import { useRef, useState } from "react";

interface DrawCanvasProps {
  onBack: () => void;
}

export default function DrawCanvas({ onBack }: DrawCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");

  const startDrawing = (e: React.MouseEvent) => setDrawing(true);
  const stopDrawing = (e: React.MouseEvent) => setDrawing(false);
  const draw = (e: React.MouseEvent) => {
    if (!drawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = tool === "pencil" ? 2 : 12;
    ctx.strokeStyle = tool === "pencil" ? "black" : "white";
    ctx.lineCap = "round";

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="mt-6 w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4 animate-fade-in">
      <h2 className="font-bold text-2xl text-gray-700">Draw Rooftop</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={250}
        className="border w-full rounded-lg bg-gray-50"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
      />
      <div className="flex gap-3 mt-2">
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl shadow-sm" onClick={() => setTool("pencil")}>Pencil</button>
        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl shadow-sm" onClick={() => setTool("eraser")}>Eraser</button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-xl shadow-sm" onClick={clearCanvas}>Clear</button>
      </div>
      <button className="mt-2 text-sm text-gray-500 hover:text-gray-700" onClick={onBack}>Back</button>
    </div>
  );
}
