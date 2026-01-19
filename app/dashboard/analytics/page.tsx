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
import { ChartNoAxesColumn, ChartNoAxesCombined, Coins } from "lucide-react";
import { getSession } from "@/app/lib/session";
import { ExportMpesaCvs } from "@/app/ui/mpesa/export-cvs";
import { Analytics } from "@/app/ui/analytics/analytics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analytics",
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
  const user = await getSession();
  // const isAdmin = user?.role === "admin";
  // const curentUser: any = await fetchUserByEmail(user?.email);
  // const userId = curentUser[0].id;

  return (
    <div className="w-full">
      <div className="">
        <h1
          className={`text-2xl flex gap-2 items-center border p-2 rounded-md`}>
          <ChartNoAxesCombined className="h-6 w-6 text-green-500" /> Analytics
        </h1>
      </div>
      <div>
        <Analytics />
      </div>
    </div>
  );
}
