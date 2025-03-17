import React, { useState, useRef } from "react";
import { X, Upload, Image as ImageIcon, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

interface MediaUploaderProps {
  maxFiles?: number;
  onChange?: (files: File[]) => void;
  value?: File[];
  accept?: string;
  className?: string;
}

const MediaUploader = ({
  maxFiles = 5,
  onChange,
  value = [],
  accept = "image/*,video/*",
  className,
}: MediaUploaderProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(
    value.length > 0
      ? value.map((file) => ({
          id: Math.random().toString(36).substring(2, 9),
          file,
          preview: URL.createObjectURL(file),
          type: file.type.startsWith("image/") ? "image" : "video",
        }))
      : [
          // Default placeholder media
          {
            id: "default-1",
            file: new File([""], "placeholder-1.jpg", { type: "image/jpeg" }),
            preview:
              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
            type: "image",
          },
          {
            id: "default-2",
            file: new File([""], "placeholder-2.jpg", { type: "image/jpeg" }),
            preview:
              "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&q=80",
            type: "image",
          },
        ],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }));

    const updatedFiles = [...mediaFiles, ...newFiles].slice(0, maxFiles);
    setMediaFiles(updatedFiles);

    if (onChange) {
      onChange(updatedFiles.map((mediaFile) => mediaFile.file));
    }
  };

  const handleRemoveFile = (id: string) => {
    const updatedFiles = mediaFiles.filter((file) => file.id !== id);
    setMediaFiles(updatedFiles);

    if (onChange) {
      onChange(updatedFiles.map((mediaFile) => mediaFile.file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer.files?.length) return;

    const newFiles = Array.from(e.dataTransfer.files)
      .filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/"),
      )
      .map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "video",
      }));

    const updatedFiles = [...mediaFiles, ...newFiles].slice(0, maxFiles);
    setMediaFiles(updatedFiles);

    if (onChange) {
      onChange(updatedFiles.map((mediaFile) => mediaFile.file));
    }
  };

  return (
    <div className={cn("w-full space-y-4 bg-white p-4", className)}>
      <div
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <Upload className="mb-3 h-10 w-10 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">
            Images and videos (max {maxFiles} files)
          </p>
        </div>
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={mediaFiles.length >= maxFiles}
        />
      </div>

      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {mediaFiles.map((file) => (
            <div
              key={file.id}
              className="group relative aspect-square overflow-hidden rounded-md border border-gray-200 bg-gray-100"
            >
              {file.type === "image" ? (
                <img
                  src={file.preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-800">
                  <FileVideo className="h-12 w-12 text-white" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all group-hover:bg-opacity-50">
                <Button
                  variant="destructive"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(file.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {mediaFiles.length < maxFiles && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add More Media
          </Button>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
