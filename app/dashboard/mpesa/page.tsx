import Pagination from "@/app/ui/mpesa/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/mpesa/table";
import { CreateInvoice } from "@/app/ui/mpesa/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import {
  fetchFilteredMpesaInvoices,
  fetchMpesaInvoicesPages,
  fetchUserByEmail,
} from "@/app/lib/sun-data";
import {
  fetchFilteredMpesaInvoices2,
  fetchMpesaInvoicesPages2,
} from "@/app/lib/sun-data2";
import { Metadata } from "next";
import { Coins } from "lucide-react";
import { getSession } from "@/app/lib/session";
import { ExportMpesaCvs } from "@/app/ui/mpesa/export-cvs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    startDate?: string;
    endDate?: string;
    pageItems?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const startDate = searchParams?.startDate || "";
  const endDate = searchParams?.endDate || "";
  const pageItems = searchParams?.pageItems || "10";

  const currentPage = Number(searchParams?.page) || 1;

  const user = await getSession();
  const isAdmin = user?.role === "admin";
  const curentUser: any = await fetchUserByEmail(user?.email);
  const userId = curentUser[0].id;
  let totalPagesGroupInvoice: any = 0;

  let ginvoices: any = [];
  if (isAdmin) {
    totalPagesGroupInvoice = await fetchMpesaInvoicesPages(
      query,
      startDate,
      endDate,
      Number(pageItems)
    );
    ginvoices = await fetchFilteredMpesaInvoices(
      query,
      currentPage,
      startDate,
      endDate,
      Number(pageItems)
    );
  }

  if (!isAdmin) {
    totalPagesGroupInvoice = await fetchMpesaInvoicesPages2(
      query,
      curentUser[0].id,
      startDate,
      endDate
    );
    ginvoices = await fetchFilteredMpesaInvoices2(
      query,
      currentPage,
      userId,
      startDate,
      endDate
    );
  }

  return (
    <div className="w-full">
      <div className="">
        <h1
          className={`text-2xl flex gap-2 items-center border p-2 rounded-md`}
        >
          <Coins className="h-6 w-6 text-green-500" /> Mpesa Invoices
        </h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices, eg name, group name..." />
        <CreateInvoice user={user} />
      </div>
      <div>
        <ExportMpesaCvs ginvoices={ginvoices} />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table
          query={query}
          currentPage={currentPage}
          user={user}
          startDate={startDate}
          endDate={endDate}
          ginvoices={ginvoices}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPagesGroupInvoice} />
      </div>
    </div>
  );
}
