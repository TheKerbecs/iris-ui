import React, { useRef } from 'react';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';

interface PDFUploaderProps {
  onPDFUpload: (file: File) => void;
  disabled?: boolean;
  className?: string;
  iconOnly?: boolean;
}

export default function PDFUploader({ 
  onPDFUpload, 
  disabled = false,
  className = '',
  iconOnly = false 
}: PDFUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onPDFUpload(file);
    }
    // Reset input value to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {iconOnly ? (
        <Button 
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleButtonClick}
          disabled={disabled}
          className={className}
        >
          <FileText className="w-5 h-5" />
        </Button>
      ) : (
        <div 
          onClick={handleButtonClick}
          className={`flex w-full gap-2 p-1 items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FileText className="w-4 h-4" />
          Upload PDF
        </div>
      )}
    </>
  );
}