import { fetchRegions, fetchUserByEmail } from "@/app/lib/data/sun-data";
import { Metadata } from "next";
import { getSession } from "@/app/lib/session";

import { ChartBarIcon } from "@heroicons/react/24/solid";
import { fetchDashboardManagerData } from "@/app/lib/data/dashboard-manager-data";
import {
  fetchGroupDisbursement,
  fetchGroupPaid,
} from "@/app/lib/data/group-perfomance-dashboard-data";
import AnalyticsCharts from "@/app/ui/analytics/Charts";

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
    regionQuery?: string;
    managerAddQuery?: string;
    managerMinusQuery?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const regions = await fetchRegions();
  const regionQuery = searchParams?.regionQuery || "";
  const managerAddQuery = searchParams?.managerAddQuery || "1 month";
  const managerMinusQuery = searchParams?.managerMinusQuery || "0 month";
  const user = await getSession();
  const isAdmin = user?.role === "admin";
  const currentUser: any = await fetchUserByEmail(user?.email);

  let regionArr: any = [];

  if (isAdmin) {
    regionArr = regions?.map((item: any) => item.id);
    if (regionQuery) {
      if (regionQuery !== "all") {
        regionArr = [regionQuery];
      }
    }
  }

  if (!isAdmin) {
    const filteredRegions = regions?.filter(
      (item: any) => item?.manager === currentUser[0].id,
    );
    regionArr = filteredRegions?.map((item: any) => item.id);
    if (regionQuery) {
      if (regionQuery !== "all") {
        regionArr = [regionQuery];
      }
    }
  }
  const managersData = await fetchDashboardManagerData(
    managerAddQuery,
    managerMinusQuery,
  );

  const group_paid: any = await fetchGroupPaid(regionArr);
  const group_disbursed: any = await fetchGroupDisbursement(regionArr);

  return (
    <div className="w-full pt-24">
      <div className="flex w-full items-center gap-2 border-1 rounded-lg p-4">
        <ChartBarIcon className="h-10 w-10 text-purple-700" />
        <h1 className={`text-xl font-extrabold uppercase`}>Analytics</h1>
      </div>
      <div>{/*<Analytics />*/}</div>
      <AnalyticsCharts
        managersData={managersData}
        currentUser={currentUser}
        group_paid={group_paid}
        group_disbursed={group_disbursed}
      />
    </div>
  );
}
