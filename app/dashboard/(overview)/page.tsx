import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import DashboardTabs from "@/app/ui/dashboard/tabs";
import DisbursementCycle from "@/app/ui/dashboard/disbursement-cycle";
import IndividualFilters from "@/app/ui/dashboard/individuals-filters";
import { LayoutDashboard } from "lucide-react";
import {
  fetchDashboardCardData,
  fetchDashboardMaxCycle,
  fetchRegions,
  fetchIndividualsDashbordCards,
  fetchIndividualsMaxCycle,
  fetchUserByEmail,
  fetchLatestMpesaInvoices,
  fetchBranches,
} from "@/app/lib/data/sun-data";
import { getSession } from "@/app/lib/session";
import { fetchDashboardChartData } from "@/app/lib/data/analytics-data";
import { RadixRevenueChart } from "@/app/ui/dashboard/radix-revenue-chart";
import { Card } from "@/app/ui/radix-components/card";
import { UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import FilterAccordion from "@/app/ui/dashboard/filter-accordion";
import DashboardSkeleton, { StatsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import StatCards from "@/app/ui/system-management/stat-cards";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    iQuery?: string;
    branchQuery?: string;
    regionQuery?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const iQuery = searchParams?.iQuery || "";
  const branchQuery = searchParams?.branchQuery || "all";
  const regionQuery = searchParams?.regionQuery || "";
  const branches = await fetchBranches();
  const regions = await fetchRegions();
  const user = await getSession();
  const isAdmin = user?.role === "admin";
  const currentUser: any = await fetchUserByEmail(user?.email);

  let selectBranches = branches;
  let regionArr: any = [];
  let selectRegions: any = regions;

  const allFilteredRegions =
    branchQuery === "all"
      ? regions
      : regions?.filter((item: any) => item.branch === branchQuery);

  if (isAdmin) {
    regionArr = allFilteredRegions?.map((item: any) => item.id);
    if (regionQuery) {
      if (regionQuery !== "all") {
        regionArr = [regionQuery];
      }
    }
  }

  if (!isAdmin) {
    const filteredRegions = allFilteredRegions?.filter(
      (item: any) => item?.manager === currentUser[0].id,
    );
    selectRegions = filteredRegions;
    regionArr = filteredRegions?.map((item: any) => item.id);
    if (regionQuery) {
      if (regionQuery !== "all") {
        regionArr = [regionQuery];
      }
    }
  }

  const groupLoansData = await fetchDashboardCardData(query, regionArr);

  const maxCycle: any = await fetchDashboardMaxCycle();

  const individualsMaxCyle: any = await fetchIndividualsMaxCycle();

  const individualLoanData = await fetchIndividualsDashbordCards(
    iQuery,
    regionArr,
  );

  let groupCycle = "All";
  if (query) {
    groupCycle = query;
  }
  let individualsCycle = "All";
  if (iQuery) {
    individualsCycle = iQuery;
  }

  const chartData = await fetchDashboardChartData(regionArr);

  const latestInvoices = await fetchLatestMpesaInvoices(regionArr, isAdmin);

  return (
    <>
      {" "}
      <main>
        <h1
          className={`mb-4 text-xl md:text-xl flex gap-2 p-2 border rounded-md  `}
        >
          <LayoutDashboard className="h-6 w-6 text-green-500" /> Dashboard
        </h1>
        <FilterAccordion
          maxCycle={maxCycle}
          selectBranches={selectBranches}
          selectRegions={selectRegions}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="rounded-xl w-full h-full  px-2 py-1">
            <div className="flex items-center  gap-2">
              <UsersIcon className="h-8 w-8 text-teal-500" />
              <h2 className="text-xl font-extrabold  ">GROUPS</h2>
            </div>
            <div className=" border-b mb-2 pb-2">
              <DisbursementCycle maxCycle={maxCycle} />{" "}
            </div>
            <Suspense key={branchQuery} fallback={<StatsSkeleton />}>
              <DashboardTabs
                isGroup={true}
                groupAmount={groupLoansData?.groupAmount}
                numberOfMembers={groupLoansData?.numberOfMembers}
                totalLoans={groupLoansData?.totalLoans}
                totalCollectedLoans={groupLoansData?.totalCollectedLoans}
                loanBalance={groupLoansData?.loanBalance}
                monthlyDisbursement={groupLoansData?.monthlyDisbursement}
                monthlyTotalLoan={groupLoansData?.monthlyTotalLoan}
                monthlyLoanBalance={groupLoansData?.loanBalance}
                monthlyCollected={groupLoansData?.monthlyCollected}
                weeklyDisbursed={groupLoansData?.weeklyDisbursed}
                weeklyTotalLoan={groupLoansData?.weeklyTotalLoan}
                weeklyCollected={groupLoansData?.weeklyCollected}
                weeklyLoanBalance={groupLoansData?.loanBalance}
                todayDisbursed={groupLoansData?.todayDisbursed}
                todayTotalLoan={groupLoansData?.todayTotalLoan}
                todayCollected={groupLoansData?.todayCollected}
                todayLoanBalance={groupLoansData?.loanBalance}
                groupCycle={groupCycle}
                user={user}
                regionQuery={branchQuery}
              />
            </Suspense>
          </Card>
          <Card className="rounded-2xl px-2 py-1">
            <div className="flex items-center  gap-2">
              <UserIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-extrabold  ">INDIVIDUAL LOANEES</h2>
            </div>
            <div className="border-b mb-2 pb-2">
              <IndividualFilters
                regions={regions}
                maxCycle={individualsMaxCyle}
              />
            </div>
            <DashboardTabs
              isGroup={false}
              groupAmount={individualLoanData?.totalIndividualDisbursed}
              numberOfMembers={individualLoanData?.totalIndivdualLoanees}
              totalLoans={Number(individualLoanData?.totalIndividualLoans)}
              totalCollectedLoans={individualLoanData?.totalIndividualCollected}
              loanBalance={
                individualLoanData?.totalIndividualLoans -
                individualLoanData?.totalIndividualCollected
              }
              monthlyDisbursement={individualLoanData?.monthIndividualDisbursed}
              monthlyTotalLoan={individualLoanData?.monthIndividualLoan}
              monthlyLoanBalance={
                individualLoanData?.totalIndividualLoans -
                individualLoanData?.totalIndividualCollected
              }
              monthlyCollected={Number(
                individualLoanData?.monthIndividualCollected,
              )}
              weeklyDisbursed={individualLoanData?.weekIndividualDisbursed}
              weeklyTotalLoan={individualLoanData?.weekIndividualLoan}
              weeklyCollected={individualLoanData?.weekIndividualCollected}
              weeklyLoanBalance={
                individualLoanData?.totalIndividualLoans -
                individualLoanData?.totalIndividualCollected
              }
              todayDisbursed={individualLoanData?.todayIndividualDisbursed}
              todayTotalLoan={individualLoanData?.todayIndividualLoan}
              todayCollected={individualLoanData?.todayIndividualCollected}
              todayLoanBalance={
                individualLoanData?.totalIndividualLoans -
                individualLoanData?.totalIndividualCollected
              }
              groupCycle={individualsCycle}
              user={user}
              regionQuery={branchQuery}
            />
          </Card>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-cols-8 mb-6">
          <LatestInvoices latestInvoices={latestInvoices} />
          <RadixRevenueChart charData={chartData} />
        </div>
      </main>
    </>
  );
}
