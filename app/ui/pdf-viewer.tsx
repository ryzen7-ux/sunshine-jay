"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure worker using a reliable CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ pdfUrl }: { pdfUrl: any }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
      <div className="shadow-lg border bg-white p-2">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p>Loading PDF Preview...</p>}
          error={
            <p>Failed to load PDF. Check CORS configurations on the host.</p>
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="mb-4"
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
