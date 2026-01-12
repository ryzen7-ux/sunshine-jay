"use client";

import React, { useRef, useState } from "react";
import { useFileUpload } from "./use-file-upload";

import { FileCheck, Trash } from "lucide-react";
import { Button, Spinner } from "@heroui/react";
import {
  revalidateIndividualFileUpload,
  revalidateMemberFileUpload,
} from "../lib/actions";
import Link from "next/link";

interface FileUploadProps {
  userType: string;
  fileUrl: any;
  member: any;
  itemId: string;
  uploadedTitle: string;
  title: string;
  currentInput: string;
  type: string;
  userId: string;
  onUploadComplete?: (result: any) => void;
  acceptedTypes?: string[];
  maxFileSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  userType,
  fileUrl,
  member,
  itemId,
  uploadedTitle,
  title,
  currentInput,
  type,
  userId,
  onUploadComplete,
  acceptedTypes = ["audio/*", "image/*"],
  maxFileSize = 20 * 1024 * 1024, // 20MB
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { uploadFile, resetUpload, isUploading, uploadProgress, uploadResult } =
    useFileUpload();

  const handleFileSelect = (file: File) => {
    // Validate file size
    if (file.size > maxFileSize) {
      alert(
        `File size ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds ${
          maxFileSize / 1024 / 1024
        }MB limit`
      );
      return;
    }

    setSelectedFile(file);
    resetUpload();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const result = await uploadFile(
      userType,
      selectedFile,
      userId,
      type,
      itemId
    );

    if (result.success && onUploadComplete) {
      onUploadComplete(result);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    resetUpload();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteImage = async () => {
    if (!confirm("Are you sure?")) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/delete-image/`, {
        method: "DELETE",
        body: JSON.stringify({
          imageUrl: fileUrl,
          itemId: itemId,
          type: type,
          userType: userType,
        }),
      });
      if (response.ok) {
        if (userType === "member") {
          await revalidateMemberFileUpload(member?.groupid);
        } else {
          await revalidateIndividualFileUpload();
        }
      }
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 rounded-lg shadow-lg">
      {fileUrl ? (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-4">{uploadedTitle}</h3>
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <FileCheck className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                Document uploaded
              </p>
              <Link
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-600 hover:underline">
                Download document
              </Link>
            </div>
            {isDeleting && type === currentInput ? (
              <Spinner
                color="danger"
                variant="wave"
                labelColor="danger"
                label="deleting..."
                size="md"
              />
            ) : (
              <Button
                type="button"
                size="sm"
                disabled={isUploading || isDeleting}
                className="text-red-600 hover:text-red-700 bg-red-200"
                startContent={<Trash className="h-4 w-4 text-red-700" />}
                onPress={() => handleDeleteImage()}>
                Delete
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">{title}</h3>

          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-green-300 hover:border-green-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleInputChange}
              accept={type === "form" ? ".pdf" : acceptedTypes.join(",")}
              className="hidden"
            />

            {selectedFile ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-green-600">
                  Drag and drop image/File here, or{" "}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-500 hover:text-blue-600 font-medium">
                    browse
                  </button>
                </p>
                <p className="text-xs text-green-600">
                  Max size: {maxFileSize / 1024 / 1024}MB
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Upload Result */}
          {uploadResult && (
            <div
              className={`mt-4 p-3 rounded ${
                uploadResult.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}>
              {uploadResult.success ? (
                <div>
                  <p className="font-medium">Upload successful!</p>
                  <p className="text-sm">File ID: {uploadResult.fileId}</p>
                </div>
              ) : (
                <p>Error: {uploadResult.error}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            {selectedFile && !isUploading && !uploadResult?.success && (
              <button
                onClick={handleUpload}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                {title}
              </button>
            )}

            {(selectedFile || uploadResult) && (
              <button
                onClick={handleReset}
                disabled={isUploading}
                className="px-4 py-2 border border-orange-300 rounded hover:bg-orange-100 transition-colors disabled:opacity-50 text-orange-600">
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
