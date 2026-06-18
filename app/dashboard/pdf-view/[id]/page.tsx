import dynamic from "next/dynamic";
import PdfWrapper from "@/app/pdf-view/pdf-wrapper";

// Disable Server Side Rendering for the PDF component
const PdfViewer = dynamic(() => import("@/app/ui/pdf-viewer"), {
  ssr: false,
});

export default async function Page(props: { params: Promise<{ id: string }> }) {
  // Replace with your external, CORS-allowed resource URL
  const params = await props.params;
  const externalPdfUrl = params.id;

  console.log(externalPdfUrl);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">External PDF Preview</h1>
      <div className="w-full max-w-4xl mx-auto">
        <PdfWrapper />
      </div>
    </main>
  );
}
