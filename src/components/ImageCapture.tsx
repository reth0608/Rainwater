import { useEffect, useRef, useState } from "react";

interface ImageCaptureProps {
  onBack: () => void;
}

export default function ImageCapture({ onBack }: ImageCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
        setCapturedImage(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl);
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  useEffect(() => {
    return () => stopCamera(); // Stop camera when component unmounts
  }, []);

  return (
    <div className="mt-6 w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-5 animate-fade-in">
      <h2 className="font-bold text-2xl text-gray-700">Capture Roof Image</h2>

      {!streaming && (
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-xl shadow-md"
          onClick={startCamera}
        >
          Start Camera
        </button>
      )}

      {streaming && (
        <>
          <video
            ref={videoRef}
            className="w-full rounded-lg border bg-gray-100"
            autoPlay
            playsInline
          />
          <div className="flex gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl shadow-sm"
              onClick={captureImage}
            >
              Capture
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl shadow-sm"
              onClick={stopCamera}
            >
              Stop Camera
            </button>
          </div>
        </>
      )}

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="mt-3 w-full rounded-lg border"
        />
      )}

      <button
        className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
}
