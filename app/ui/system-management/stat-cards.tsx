"use client";

import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ScaleIcon,
  UsersIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CircleStackIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data/data";
import {
  formatDateToLocal,
  formatCurrency,
  formatCurrencyToLocal,
} from "@/app/lib/utils";
import { fetchDashboardCardData } from "@/app/lib/data/sun-data";
import { select } from "@heroui/theme";
import { Card as RadixCard } from "@/app/ui/radix-components/card";
import { HandCoinsIcon, Users, NetworkIcon, Disc } from "lucide-react";
import { Chip } from "@heroui/react";
import { Stats } from "node:fs";

const iconMap = {
  staff: Users,
  branches: NetworkIcon,
  regions: Disc,
};

export default function StatCards({
  staff_count,
  branches_count,
  regions_count,
}: {
  staff_count: any;
  branches_count: any;
  regions_count: any;
}) {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card
        title="STAFF"
        value={staff_count}
        type="staff"
        color="bg-teal-800"
      />
      <Card
        title="BRANCHES"
        value={branches_count}
        type="branches"
        color="bg-amber-800"
      />
      <Card
        title="REGIONS"
        value={regions_count}
        type="regions"
        color="bg-pink-800"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
  color,
}: {
  title: string;
  value: number;
  type: "staff" | "branches" | "regions";
  color: string;
}) {
  const Icon = iconMap[type];

  return (
    <RadixCard className={`w-full px-5 py-2.5`}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm ">{title}</p>
          <p className="text-2xl font-extrabold ">{value}</p>
        </div>
        <div>
          <div className={`p-2 rounded-md ${color}`}>
            <Icon className={`h-6 w-6 text-white`} />
          </div>
        </div>
      </div>
    </RadixCard>
  );
}
