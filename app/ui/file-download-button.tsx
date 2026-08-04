"use client";

import { DownloadCloudIcon } from "lucide-react";

export default function FileDownloadButton({
  fileUrl,
  fileName,
}: {
  fileUrl: any;
  fileName: any;
}) {
  return (
    <a
      href={fileUrl}
      download={fileName}
      className="flex justify-center items-center gap-1 bg-green-600 text-white font-medium px-2 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-200 ease-in-out my-2"
    >
      <DownloadCloudIcon className="h-6 w-6" /> Download File
    </a>
  );
}
