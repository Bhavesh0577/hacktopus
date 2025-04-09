import React, { useState, useCallback } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import axios from "axios";
import { Camera, Upload } from "lucide-react";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const authenticator = async () => {
  try {
    const response = await axios.get("/api/auth");

    if (!response.data) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const { signature, expire, token } = response.data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [hover, setHover] = useState(false);
  const uploadRef = React.useRef<HTMLInputElement>(null);

  const onError = (err: any) => {
    console.error("Upload Error:", err);
    setError("Image upload failed. Please try again.");
    setLoading(false);
  };

  const onSuccess = (res: any) => {
    console.log("Upload Success:", res);
    if (res?.url) {
      onChange(res.url);
      setError("");
    }
    setLoading(false);
  };

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Triggers when file is dropped
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (uploadRef.current) {
        uploadRef.current.click();
      }
    }
  }, []);

  // Trigger file input click
  const handleClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  return (
    <button
      type="button"
      className={`relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center group border border-zinc-700/50 
        ${dragActive ? "bg-zinc-700/50" : "bg-zinc-800/50"} 
        ${hover ? "shadow-lg" : ""} 
        transition-all duration-300`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>

      <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey}>
        <IKUpload
          id="file-upload"
          ref={uploadRef}
          fileName="upload.jpg"
          onError={onError}
          onSuccess={onSuccess}
          folder="/HackathonFinder"
          authenticator={authenticator}
          className="hidden"
          onUploadStart={() => setLoading(true)}
        />
      </ImageKitProvider>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {value ? (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
            <p className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">Click to change image</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
          <Upload className="w-10 h-10 text-zinc-500 mb-6" />
          <p className="text-sm text-center text-zinc-400 max-w-[220px] mx-auto leading-5">Drop your image here or click to browse</p>
        </div>
      )}

      {dragActive && (
        <div className="absolute inset-0 bg-purple-500/20 border-2 border-dashed border-purple-500 rounded-xl z-20 flex items-center justify-center">
          <p className="text-white text-lg font-medium">Drop file to upload</p>
        </div>
      )}

      {error && (
        <div className="absolute bottom-2 left-0 right-0 text-center z-20">
          <p className="bg-red-500/80 text-white text-sm py-1 px-3 rounded-full inline-block">{error}</p>
        </div>
      )}
    </button>
  );
};

export default ImageUpload;
