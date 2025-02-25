"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "./ui/button";
import { FileIcon, UploadIcon } from "lucide-react";
import { toast } from "sonner";

export default function PDFUploader({ onPDFUpload }: { onPDFUpload: (file: File) => void }) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      setIsUploading(true);
      // Call the parent's upload handler
      onPDFUpload(file);
      setTimeout(() => setIsUploading(false), 1000);
    }
  }, [onPDFUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div 
      {...getRootProps()} 
      className="flex w-full gap-2 p-1 items-center cursor-pointer hover:bg-accent hover:text-accent-foreground"
    >
      {isUploading ? (
        <>
          <FileIcon className="w-4 h-4 animate-pulse" />
          <span>Uploading...</span>
        </>
      ) : (
        <>
          <UploadIcon className="w-4 h-4" />
          <input {...getInputProps()} />
          {isDragActive ? 'Drop PDF here' : 'Import PDF'}
        </>
      )}
    </div>
  );
}