"use client";

import useAction from "@/hooks/use-action";
import { Result } from "@/lib/types/util";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function UploadButton<R>({
  action,
  text,
  className,
  callbacks = {
    onSuccess: () => toast.success("Uploaded successfully"),
    onFail: (e) => toast.error(`Upload failed: ${e}`),
  },
}: {
  action: (args: string) => Promise<Result<R>>;
  text: string;
  className: string;
  callbacks?: {
    onSuccess?: (result: R) => void;
    onFail?: (error: string) => void;
  };
}) {
  const { startUpload, isUploading } = useUploadThing("mixedFileTypeUploader", {
    onUploadError: (error: { toString: () => string }) => {
      callbacks.onFail?.(error.toString());
    },
  });
  const { start: startAction, isLoading: isLoadingAction } = useAction(
    action,
    callbacks,
  );
  const isLoading = isUploading || isLoadingAction;

  return (
    <label
      className={cn(
        "block w-fit bg-white/10 cursor-pointer active:bg-white active:text-primary hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm border border-white/15",
        isLoading && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <div role="button">{text}</div>
      <input
        type="file"
        className="hidden"
        disabled={isLoading}
        onChange={async (e) => {
          const files = e.target.files;
          if (files && files.length === 1) {
            const res = await startUpload(Array.from(files));
            e.target.value = "";
            if (res) await startAction(res[0].ufsUrl);
          }
        }}
      />
    </label>
  );
}
