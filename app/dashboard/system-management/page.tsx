import {
  fetchUsers,
  fetchRegions,
  fetchBranches,
} from "@/app/lib/data/sun-data";
import { MonitorCog } from "lucide-react";
import { getSession } from "@/app/lib/session";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import SystemTabs from "@/app/ui/system-management/tabs";
import StatCards from "@/app/ui/system-management/stat-cards";
import { fetchSystemCardStats } from "@/app/lib/data/sun-data2";
import StatsAccordion from "@/app/ui/system-management/stats-accordion";

export default async function Page() {
  const user = await getSession();
  if (user.role !== "admin") {
    return (
      <main className="pt-24">
        <div className="p-6 flex items-center  justify-center">
          <p className="text-lg bg-red-100 text-red-500 border rounded-md p-4 flex gap-2 items-center">
            <ExclamationCircleIcon className="h-12 w-12 text-yellow-500" /> You
            are not allowed to view this page!
          </p>
        </div>
      </main>
    );
  }

  const users = await fetchUsers();
  const branches = await fetchBranches();
  const regions = await fetchRegions();

  const { staff_count, branches_count, regions_count } =
    await fetchSystemCardStats();



  return (
    <main className="pt-24">
      <h1
        className={`mb-4 text-xl md:text-xl font-bold flex items-center gap-2 text-green-600 border rounded-md p-2 uppercase`}
      >
        <MonitorCog className="h-10 w-10 text-green-500" /> System Management
      </h1>
      <StatsAccordion
        staff_count={staff_count}
        regions_count={regions_count}
        branches_count={branches_count}
      />
      {/*<div className="grid gap-2 grid-cols-1 md:grid-cols-3 mb-6">*/}
      {/*  <StatCards*/}
      {/*    staff_count={staff_count}*/}
      {/*    regions_count={regions_count}*/}
      {/*    branches_count={branches_count}*/}
      {/*  />*/}
      {/*</div>*/}
      <SystemTabs
        users={users}
        currentUser={user}
        regions={regions}
        branches={branches}
      />
    </main>
  );
}
