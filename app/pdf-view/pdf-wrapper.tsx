"use client";

import dynamic from "next/dynamic";

// Disable Server Side Rendering for the PDF component
const PdfViewer = dynamic(() => import("@/app/ui/pdf-viewer"), {
  ssr: false,
});

export default function PdfWrapper() {
  // Replace with your external, CORS-allowed resource URL
  const externalPdfUrl = "https://example.com";

  return (
    <PdfViewer pdfUrl="https:/storage.googleapis.com/omondi_app_storage/user_SUNSHINE/2026-06-18/4302bce9-5cfe-4458-94f5-da90c72f9489.pdf" />
  );
}
