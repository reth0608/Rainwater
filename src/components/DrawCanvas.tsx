import { useRef, useState } from "react";

interface DrawCanvasProps {
  onBack: () => void;
}

type Tool = "pencil" | "eraser" | "line" | "rectangle" | "circle" | "pentagon";

export default function DrawCanvas({ onBack }: DrawCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>("pencil");
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  const getCtx = () => canvasRef.current?.getContext("2d");

  const startDrawing = (e: React.MouseEvent) => {
    setDrawing(true);
    setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

    if (tool === "pencil" || tool === "eraser") {
      const ctx = getCtx();
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const stopDrawing = (e: React.MouseEvent) => {
    if (!drawing || !canvasRef.current || !startPos) return;
    const ctx = getCtx();
    if (!ctx) return;

    const endX = e.nativeEvent.offsetX;
    const endY = e.nativeEvent.offsetY;

    switch (tool) {
      case "line":
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        break;
      case "rectangle":
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          startPos.x,
          startPos.y,
          endX - startPos.x,
          endY - startPos.y
        );
        break;
      case "circle":
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        const radius = Math.sqrt(Math.pow(endX - startPos.x, 2) + Math.pow(endY - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case "pentagon":
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        const sides = 5;
        const angle = (2 * Math.PI) / sides;
        const r = Math.sqrt(Math.pow(endX - startPos.x, 2) + Math.pow(endY - startPos.y, 2));
        for (let i = 0; i <= sides; i++) {
          const x = startPos.x + r * Math.cos(i * angle - Math.PI / 2);
          const y = startPos.y + r * Math.sin(i * angle - Math.PI / 2);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        break;
      default:
        break;
    }

    setDrawing(false);
    setStartPos(null);
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing || !canvasRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;

    if (tool === "pencil" || tool === "eraser") {
      ctx.lineWidth = tool === "pencil" ? 2 : 12;
      ctx.strokeStyle = tool === "pencil" ? "black" : "white";
      ctx.lineCap = "round";
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = getCtx();
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
      <div className="flex gap-3 mt-2 flex-wrap">
        {["pencil","eraser","line","rectangle","circle","pentagon"].map((t) => (
          <button
            key={t}
            className={`p-2 rounded-xl shadow-sm ${
              tool === t
                ? "bg-purple-600 text-white"
                : t === "eraser"
                ? "bg-red-600 text-white"
                : "bg-gray-600 text-white"
            } hover:brightness-90`}
            onClick={() => setTool(t as Tool)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-xl shadow-sm"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
      <button
        className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
}
