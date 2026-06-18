"use client";

import dynamic from "next/dynamic";

// Disable Server Side Rendering for the PDF component
const PdfViewer = dynamic(() => import("@/app/ui/pdf-viewer"), {
  ssr: false,
});

export default function PdfWrapper({ pdfUrl }: { pdfUrl: any }) {
  return <PdfViewer pdfUrl={pdfUrl} />;
}
