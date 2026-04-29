"use client";

import DashboardManagerPerformance from "@/app/ui/dashboard/manager-perfomance";
import GroupBarCharts from "@/app/ui/dashboard/group-barcharts";

export default function AnalyticsCharts({
  managersData,
  currentUser,
  group_paid,
  group_disbursed,
}: {
  managersData: any;
  currentUser: any;
  group_paid: any;
  group_disbursed: any;
}) {
  return (
    <div className="my-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        <GroupBarCharts
          group_paid={group_paid}
          group_disbursed={group_disbursed}
        />
        <DashboardManagerPerformance
          managersData={managersData}
          user={currentUser}
        />
      </div>
    </div>
  );
}
