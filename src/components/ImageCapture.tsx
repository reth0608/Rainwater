interface ImageCaptureProps {
  onBack: () => void;
}

export default function ImageCapture({ onBack }: ImageCaptureProps) {
  return (
    <div className="mt-6 w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-5 animate-fade-in">
      <h2 className="font-bold text-2xl text-gray-700">Capture Roof Image</h2>
      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-xl shadow-md">
        Start Camera
      </button>
      <button className="mt-2 text-sm text-gray-500 hover:text-gray-700" onClick={onBack}>Back</button>
    </div>
  );
}
