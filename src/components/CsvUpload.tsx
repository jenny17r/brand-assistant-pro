import { useRef, useState } from "react";
import { UploadCloud, FileSpreadsheet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CsvUpload() {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
      }}
      className={cn(
        "rounded-xl border-2 border-dashed p-8 text-center transition-colors",
        drag ? "border-foreground bg-muted/60" : "border-border bg-muted/20",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
      />

      {file ? (
        <div className="flex items-center justify-center gap-3">
          <FileSpreadsheet className="h-5 w-5 text-foreground" />
          <span className="text-sm font-medium">{file.name}</span>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="h-10 w-10 mx-auto rounded-full bg-card border border-border grid place-items-center">
            <UploadCloud className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Upload Sales CSV</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Drag and drop, or click to browse. Supports CSV and Excel.
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
            Choose file
          </Button>
        </div>
      )}
    </div>
  );
}
