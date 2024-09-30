import React, { useState } from 'react';
import { Label } from '../label';
import { Input } from '../input';
import { FileUp, ImageUp, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../button';
import ECommerceTooltip from './ECommerceTooltip';
import useCustomToast from '@/hooks/useCustomToast';
import { uploadFile } from '@/lib/utils';
import Heading5 from '../headings/Heading5';

type FileObj = {
  file: File | null;
  preview: string;
  uploaded: boolean;
  loading: boolean;
};

interface IProps {
  onChange: (urls: string[]) => void;
  maxImages?: number;
  isMultipart?: boolean;
  initialImages?: string[];
}

const ECommerceImageUpload = ({
  onChange,
  maxImages = 4,
  isMultipart = true,
  initialImages = [],
}: IProps) => {
  const { showToast } = useCustomToast();
  const [files, setFiles] = useState<FileObj[]>(() =>
    initialImages.map((url) => ({
      file: null,
      preview: url,
      uploaded: true,
      loading: false,
    }))
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).slice(
      0,
      maxImages - files.length
    );

    if (newFiles.length + files.length > maxImages) {
      showToast(
        'warn',
        'Warning!',
        `You can upload a maximum of ${maxImages} images`
      );
      return;
    }

    const fileObjs = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploaded: false,
      loading: false,
    }));

    setFiles((prevFiles) => [...prevFiles, ...fileObjs]);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFileUpload = async (file: File, index: number) => {
    if (!file) {
      showToast('warn', 'Warning!', 'Please select a file');
      return;
    }

    setFiles((prevFiles) =>
      prevFiles.map((f, idx) => (idx === index ? { ...f, loading: true } : f))
    );

    try {
      const res = await uploadFile(file);
      if (res.success) {
        setFiles((prevFiles) => {
          const updatedFiles = prevFiles.map((f, idx) =>
            idx === index
              ? {
                  ...f,
                  preview: res.data as string,
                  uploaded: true,
                  loading: false,
                }
              : f
          );

          const uploadedFiles = updatedFiles
            .filter((f) => f.uploaded)
            .map((f) => f.preview);

          if (uploadedFiles.length === maxImages) {
            onChange(uploadedFiles);
          }

          return updatedFiles;
        });
        showToast('success', 'Hurray!', 'Image Uploaded Successfully');
      }
    } catch (error) {
      console.error({ error });
      showToast('destructive', 'Oops!', 'Something Went Wrong');
      setFiles((prevFiles) =>
        prevFiles.map((f, idx) =>
          idx === index ? { ...f, loading: false } : f
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={`flex flex-col gap-4`}>
        {files.map((file, index) => (
          <div key={index} className="flex justify-between rounded border p-2">
            <div className="flex items-center gap-4">
              <div className="relative size-16">
                <Image
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  className="rounded border object-fill"
                  fill
                />
              </div>
              <Heading5 className="!text-base text-secondary-foreground">
                {file.file?.name ?? `Image ${index + 1}`}
              </Heading5>
            </div>
            <div className="flex items-center gap-1">
              {!file.uploaded && (
                <ECommerceTooltip tooltipContent="Upload">
                  <Button
                    type="button"
                    size="icon"
                    variant={'link'}
                    className="w-auto px-2"
                    isLoading={file.loading}
                    disabled={file.loading}
                    onClick={async () => handleFileUpload(file.file!, index)}
                  >
                    <FileUp strokeWidth={1.5} />
                  </Button>
                </ECommerceTooltip>
              )}
              {(initialImages.length > 0 || !file.uploaded) && (
                <ECommerceTooltip tooltipContent="Remove">
                  <Button
                    type="button"
                    size="icon"
                    variant="link"
                    className="text-destructive"
                    onClick={() => removeFile(index)}
                  >
                    <Trash2 strokeWidth={1.5} />
                  </Button>
                </ECommerceTooltip>
              )}
            </div>
          </div>
        ))}
      </div>

      {files.length < maxImages && (
        <Label htmlFor="imgUrls">
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-primary p-2">
            <ImageUp strokeWidth={1} className="size-12 text-primary" />
          </div>
        </Label>
      )}

      <Input
        id="imgUrls"
        type="file"
        className="hidden"
        accept="image/gif, image/jpeg, image/png"
        multiple={isMultipart}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ECommerceImageUpload;
