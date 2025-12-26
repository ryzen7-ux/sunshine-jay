import Pagination from "@/app/ui/loans/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/loans/table";
import { CreateInvoice } from "@/app/ui/loans/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import {
  fetchLoansPages,
  fetchGroups,
  fetchGroupMembers,
  fetchLoanByIdNew,
  fetchUserByEmail,
  fetchFilteredLoans,
} from "@/app/lib/sun-data";
import {
  fetchFilteredLoans2,
  fetchGroups2,
  fetchLoansPages2,
} from "@/app/lib/sun-data2";
import { Metadata } from "next";
import { ProcessDisbursement } from "@/app/ui/loans/buttons";
import { getSession } from "@/app/lib/session";
import { ExportLoanCvs } from "@/app/ui/loans/export-cvs";

export const metadata: Metadata = {
  title: "Loans",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    memberQuery?: string;
    startDate?: string;
    endDate?: string;
    pageItems?: string;
  }>;
  params: Promise<{ id: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const memberQuery = searchParams?.memberQuery || "";
  const startDate = searchParams?.startDate || "";
  const endDate = searchParams?.endDate || "";
  const pageItems = searchParams?.pageItems || "10";
  const currentPage = Number(searchParams?.page) || 1;

  const user = await getSession();
  const isAdmin = user?.role === "admin";
  const curentUser: any = await fetchUserByEmail(user?.email);
  const userId = curentUser[0].id;

  const params = await props.params;
  const id = params.id;

  let loan: any = [];
  let groups: any = [];
  let totalPages: any = 0;
  let loans: any = [];

  if (id) {
    [loan] = await Promise.all([fetchLoanByIdNew(id)]);
  }

  if (isAdmin) {
    groups = await fetchGroups();
    totalPages = await fetchLoansPages(
      query,
      startDate,
      endDate,
      Number(pageItems)
    );
    loans = await fetchFilteredLoans(
      query,
      currentPage,
      startDate,
      endDate,
      Number(pageItems)
    );
  }

  if (!isAdmin) {
    groups = await fetchGroups2(userId);
    totalPages = await fetchLoansPages2(
      query,
      userId,
      startDate,
      endDate,
      Number(pageItems)
    );
    loans = await fetchFilteredLoans2(
      query,
      currentPage,
      userId,
      startDate,
      endDate,
      Number(pageItems)
    );
  }

  const members = await fetchGroupMembers(memberQuery);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-xl font-bold text-gray-900`}>
          Loans and Disbursments
        </h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search loans..." />

        <CreateInvoice groups={groups} members={members} />
      </div>
      <div>
        <ExportLoanCvs loans={loans} />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table
          query={query}
          currentPage={currentPage}
          loan={loan}
          user={curentUser}
          loans={loans}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
