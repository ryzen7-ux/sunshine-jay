import PdfWrapper from "@/app/pdf-view/pdf-wrapper";

// Disable Server Side Rendering for the PDF component

export default async function Page(props: {
  searchParams?: Promise<{
    pdfUrl?: string;
  }>;
}) {
  // Replace with your external, CORS-allowed resource URL
  const searchParams: any = await props.searchParams;
  const pdfUrl = searchParams.pdfUrl || "";

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">External PDF Preview</h1>
      <div className="w-full max-w-4xl mx-auto">
        <PdfWrapper />
      </div>
    </main>
  );
}
