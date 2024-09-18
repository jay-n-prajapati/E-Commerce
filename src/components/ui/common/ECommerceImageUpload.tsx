// import React, { useState } from 'react';
// import { Label } from '../label';
// import { Input } from '../input';
// import { CircleX, FileUp, ImageUp } from 'lucide-react';
// import Image from 'next/image';
// import { Button } from '../button';
// import ECommerceTooltip from './ECommerceTooltip';
// import useCustomToast from '@/hooks/useCustomToast';
// import { uploadFile } from '@/lib/utils';

// type FileObj = {
//   file: File;
//   preview: string;
// };

// interface IProps {
//   onChange: (urls: string[]) => void;
// }

// const ECommerceImageUpload = ({ onChange }: IProps) => {
//   const { showToast } = useCustomToast();
//   const [selectedFiles, setSelectedFiles] = useState<FileObj[]>([]);
//   const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);

//     if (files.length + selectedFiles.length > 4) {
//       showToast('warn', 'Warning!', 'You can upload a maximum of 4 images');
//       return;
//     }

//     const newFiles = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
//   };

//   // Remove a file from the selected files list
//   const removeFile = (indexToRemove: number) => {
//     setSelectedFiles((prevFiles) =>
//       prevFiles.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   // handle file upload
//   const handleFileUpload = async (file: File) => {
//     if (!file) {
//       showToast('warn', 'Warning!', 'Please select file');
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await uploadFile(file);
//       if (res.success) {
//         setUploadedFiles((prev) => {
//           const updatedUrls = [...prev, res.data as string];
//           if (updatedUrls.length === 4) {
//             onChange(updatedUrls);
//           }
//           return updatedUrls;
//         });
//         showToast('success', 'Hurray!', 'Image Uploaded Successfully');
//       }
//     } catch (error) {
//       console.log({ error });
//       showToast('destructive', 'Oops!', 'Something Went Wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="grid gap-4 sm:grid-cols-2">
//         {selectedFiles.map((file, index) => (
//           <div key={index} className="relative h-40 w-full">
//             <Image
//               src={file.preview}
//               alt={`Preview ${index + 1}`}
//               className="rounded border-2 object-cover p-1"
//               fill
//             />
//             <div className="absolute right-1 top-1 flex items-center gap-2">
//               <ECommerceTooltip tooltipContent="Upload">
//                 <Button
//                   type="button"
//                   size="icon"
//                   className="size-7 w-auto px-2"
//                   isLoading={loading}
//                   disabled={loading}
//                   onClick={async () => handleFileUpload(file.file)}
//                 >
//                   <FileUp className="size-5" />
//                 </Button>
//               </ECommerceTooltip>
//               <ECommerceTooltip tooltipContent="Remove">
//                 <Button
//                   type="button"
//                   size="icon"
//                   variant="destructive"
//                   className="size-7"
//                   onClick={() => removeFile(index)}
//                 >
//                   <CircleX className="size-5" />
//                 </Button>
//               </ECommerceTooltip>
//             </div>
//           </div>
//         ))}

//         {selectedFiles.length < 4 &&
//           Array.from({ length: 4 - selectedFiles.length }).map((_, index) => (
//             <div
//               key={index}
//               className="flex h-40 w-full items-center justify-center rounded border border-dashed border-primary bg-secondary p-6"
//             >
//               <ImageUp strokeWidth={1} className="size-8 text-primary" />
//             </div>
//           ))}
//       </div>

//       {selectedFiles.length < 4 && (
//         <Label htmlFor="imgUrls">
//           <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-primary p-4">
//             <ImageUp strokeWidth={1} className="size-8 text-primary" />
//             <p className="text-primary">Select file to upload Image</p>
//           </div>
//         </Label>
//       )}

//       <Input
//         id="imgUrls"
//         type="file"
//         className="hidden"
//         accept="image/gif, image/jpeg, image/png"
//         multiple
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// };

// export default ECommerceImageUpload;

import React, { useState } from 'react';
import { Label } from '../label';
import { Input } from '../input';
import { CircleX, FileUp, ImageUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../button';
import ECommerceTooltip from './ECommerceTooltip';
import useCustomToast from '@/hooks/useCustomToast';
import { uploadFile } from '@/lib/utils';

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
      <div
        className={`${maxImages === 1 ? 'block' : 'grid'} gap-4 sm:grid-cols-2`}
      >
        {files.map((file, index) => (
          <div key={index} className="relative h-40 w-full">
            <Image
              src={file.preview}
              alt={`Preview ${index + 1}`}
              className="rounded border-2 object-contain p-1"
              fill
            />
            <div className="absolute right-1 top-1 flex items-center gap-2">
              {!file.uploaded && (
                <ECommerceTooltip tooltipContent="Upload">
                  <Button
                    type="button"
                    size="icon"
                    className="size-7 w-auto px-2"
                    isLoading={file.loading}
                    disabled={file.loading}
                    onClick={async () => handleFileUpload(file.file!, index)}
                  >
                    <FileUp className="size-5" />
                  </Button>
                </ECommerceTooltip>
              )}
              {(initialImages.length > 0 || !file.uploaded) && (
                <ECommerceTooltip tooltipContent="Remove">
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="size-7"
                    onClick={() => removeFile(index)}
                  >
                    <CircleX className="size-5" />
                  </Button>
                </ECommerceTooltip>
              )}
            </div>
          </div>
        ))}
      </div>

      {files.length < maxImages && (
        <Label htmlFor="imgUrls" className="mx-auto w-fit">
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-primary p-4">
            <ImageUp strokeWidth={1} className="size-8 text-primary" />
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
