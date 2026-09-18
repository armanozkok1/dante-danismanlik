"use client";

import * as React from "react";
import {
  UploadCloud,
  X,
  FileText,
  FileImage,
  FileArchive,
  File as FileIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export interface FileUploaderProps {
  maxSizeMB?: number; // Varsayılan 5 MB
  maxFiles?: number; // Varsayılan 5 dosya
  accept?: string; // örn: "image/*,.pdf,.zip"
  onChange?: (files: File[]) => void;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getFileIcon(file: File) {
  if (file.type.startsWith("image/")) {
    return <FileImage className="h-5 w-5 text-sky-400" />;
  }
  if (file.type.includes("pdf") || file.type.includes("document") || file.type.includes("text")) {
    return <FileText className="h-5 w-5 text-indigo-400" />;
  }
  if (file.type.includes("zip") || file.type.includes("rar") || file.type.includes("tar")) {
    return <FileArchive className="h-5 w-5 text-amber-400" />;
  }
  return <FileIcon className="h-5 w-5 text-muted-foreground" />;
}

export function FileUploader({
  maxSizeMB = 5,
  maxFiles = 5,
  accept = "image/*,.pdf,.docx,.zip",
  onChange,
  className,
}: FileUploaderProps) {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (incomingFiles: FileList | File[]) => {
    const validFiles: FileItem[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    Array.from(incomingFiles).forEach((file) => {
      if (files.length + validFiles.length >= maxFiles) return;

      if (file.size > maxSizeBytes) {
        validFiles.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          progress: 0,
          status: "error",
          error: `Maksimum ${maxSizeMB}MB aşamaz.`,
        });
      } else {
        validFiles.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          progress: 0,
          status: "uploading",
        });
      }
    });

    const updated = [...files, ...validFiles];
    setFiles(updated);
    if (onChange) {
      onChange(updated.map((f) => f.file));
    }

    // Yükleme simülasyonu
    validFiles.forEach((item) => {
      if (item.status === "uploading") {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 30) + 20;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === item.id ? { ...f, progress: 100, status: "completed" } : f
              )
            );
          } else {
            setFiles((prev) =>
              prev.map((f) => (f.id === item.id ? { ...f, progress } : f))
            );
          }
        }, 300);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    if (onChange) {
      onChange(updated.map((f) => f.file));
    }
  };

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {/* Sürükle Bırak Alanı */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-6 text-center transition-all cursor-pointer hover:border-primary/50 hover:bg-accent/40",
          isDragging && "border-primary bg-primary/5 ring-4 ring-primary/10"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-transform group-hover:scale-110">
          <UploadCloud className="h-6 w-6 text-primary" />
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-sm font-semibold text-foreground">
            Dosya yüklemek için tıklayın veya buraya sürükleyin
          </p>
          <p className="text-xs text-muted-foreground">
            Desteklenenler: PNG, JPG, PDF, DOCX (Maks {maxSizeMB}MB, en fazla {maxFiles} dosya)
          </p>
        </div>
      </div>

      {/* Yüklenen Dosya Listesi */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground px-1">
            Yüklenen Dosyalar ({files.length}/{maxFiles})
          </p>
          <div className="space-y-2">
            {files.map((fileItem) => {
              const isImage = fileItem.file.type.startsWith("image/");
              const previewUrl = isImage ? URL.createObjectURL(fileItem.file) : null;

              return (
                <div
                  key={fileItem.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-2xs transition-all"
                >
                  {/* Dosya İkonu veya Görsel Önizleme */}
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={fileItem.file.name}
                      className="h-10 w-10 rounded-md object-cover border border-border"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                      {getFileIcon(fileItem.file)}
                    </div>
                  )}

                  {/* Dosya Detayları & İlerleme Barı */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium truncate text-foreground">
                        {fileItem.file.name}
                      </span>
                      <span className="text-muted-foreground shrink-0 ml-2">
                        {formatBytes(fileItem.file.size)}
                      </span>
                    </div>

                    {fileItem.status === "uploading" && (
                      <div className="space-y-1">
                        <Progress value={fileItem.progress} className="h-1.5" />
                        <div className="text-[10px] text-muted-foreground text-right">
                          %{fileItem.progress}
                        </div>
                      </div>
                    )}

                    {fileItem.status === "completed" && (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Yüklendi</span>
                      </div>
                    )}

                    {fileItem.status === "error" && (
                      <div className="flex items-center gap-1 text-[11px] text-destructive font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{fileItem.error || "Yükleme hatası"}</span>
                      </div>
                    )}
                  </div>

                  {/* Silme Butonu */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(fileItem.id);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
