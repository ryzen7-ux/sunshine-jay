"use client";

import { Card } from "@/app/ui/radix-components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/ui/radix-components/chart";
import { Cell, Pie, PieChart } from "recharts";
import { UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";
import { NoSymbolIcon } from "@heroicons/react/16/solid";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-3))",
  },
  listeners: {
    label: "Listeners",
    color: "hsl(var(--chart-1))",
  },
  shows: {
    label: "Shows",
    color: "hsl(var(--chart-2))",
  },
};

const colors = [
  "#0088FE",
  "#ea4f28",
  "#b3671b",
  "#c3ba1a",
  "#7a9116",
  "#77d51e",
  "#10ca89",
  "#16c5b6",
  "#9568e1",
  "#c617e1",
];
const revenueSourcesData = [
  { name: "Advertising", value: 7200, color: "#0088FE" },
  { name: "Sponsorships", value: 3800, color: "hsl(var(--chart-2))" },
  { name: "Events", value: 1450, color: "hsl(var(--fill-green-500))" },
  { name: "Merchandise", value: 650, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 350, color: "hsl(var(--chart-5))" },
];

export default function GroupBarCharts(props: any) {
  const sorted_latest_disbursement = props.group_disbursed
    ?.filter((item: any) => Number(item.latest_disbursement ?? 0) > 0)
    ?.sort(
      (a: any, b: any) =>
        Number(b.latest_disbursement ?? 0) - Number(a.latest_disbursement ?? 0),
    );

  const sorted_latest_paid = props.group_paid
    ?.filter((item: any) => Number(item.latest_paid ?? 0) > 0)
    ?.sort(
      (a: any, b: any) =>
        Number(b.latest_paid ?? 0) - Number(a.latest_paid ?? 0),
    );

  const othersTotal: any = (
    arr: any,
    isDisbursement: boolean,
    isLatestDisbursement: boolean,
    isPaid: boolean,
    isLatestPaid: boolean,
  ) => {
    return arr?.reduce((acc: any, cur: any) => {
      return isDisbursement
        ? (acc ?? 0) + Number(cur.total_disbursement ?? 0)
        : isLatestDisbursement
          ? (acc ?? 0) + Number(cur.latest_disbursement ?? 0)
          : isPaid
            ? (acc ?? 0) + Number(cur.total_paid ?? 0)
            : isLatestPaid
              ? (acc ?? 0) + Number(cur.latest_paid ?? 0)
              : 0;
    }, 0);
  };

  const sortedArray = (
    arr: any,
    isDisbursement: boolean,
    isLatestDisbursement: boolean,
    isPaid: boolean,
    isLatestPaid: boolean,
  ) => {
    return arr
      ?.map((item: any, index: number) => {
        return {
          name: item.name ?? "",
          value: isDisbursement
            ? Number(item.total_disbursement ?? 0)
            : isLatestDisbursement
              ? Number(item.latest_disbursement ?? 0)
              : isPaid
                ? Number(item.total_paid ?? 0)
                : isLatestPaid
                  ? Number(item.latest_paid ?? 0)
                  : 0,
          color: colors[index] ?? "rgba(225,23,60,0.68)",
        };
      })
      ?.slice(0, 10);
  };

  // Disbursement
  const otherTotalDisbursement = othersTotal(
    props.group_disbursed,
    true,
    false,
    false,
    false,
  );

  const otherLatestDisbursement = othersTotal(
    sorted_latest_disbursement,
    false,
    true,
    false,
    false,
  );
  const sortedTotalDisbursement = sortedArray(
    props.group_disbursed,
    true,
    false,
    false,
    false,
  )?.filter((item: any) => Number(item.value ?? 0) > 0);

  console.log(sortedTotalDisbursement);
  const sortedLatestDisbursement = sortedArray(
    sorted_latest_disbursement,
    false,
    true,
    false,
    false,
  );

  // paid
  const otherTotalPaid = othersTotal(
    props.group_paid,
    false,
    false,
    true,
    false,
  );

  const otherLatestPaid = othersTotal(
    sorted_latest_paid,
    false,
    false,
    false,
    true,
  );

  const sortedTotalPaid = sortedArray(
    props.group_paid,
    false,
    false,
    true,
    false,
  )?.filter((item: any) => Number(item.value ?? 0) > 0);

  const sortedLatestPaid = sortedArray(
    sorted_latest_paid,
    false,
    false,
    false,
    true,
  );

  return (
    <Card className="mb-6">
      <div className="flex items-center  gap-2 pl-2">
        <UserGroupIcon className="h-8 w-8 text-lime-700" />
        <h2 className="text-xl font-extrabold  ">
          GROUPS PERFORMANCE (TOP 10)
        </h2>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2  ">
        <div className="">
          <h1 className="pl-6 text-sm font-bold">TOTAL DISBURSEMENT</h1>
          {otherTotalDisbursement > 0 ? (
            <ChartContainer config={chartConfig}>
              <PieChart className="xl:py-2">
                <Pie
                  data={sortedTotalDisbursement}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => {
                    if (!name || percent === undefined) return "";
                    return `${name} ${(Number(percent) * 100).toFixed(0)}%`;
                  }}
                >
                  {sortedTotalDisbursement?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full gap-2">
              <NoSymbolIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm">No data available</p>
            </div>
          )}
        </div>
        <div className="">
          <h1 className="pl-6 text-sm font-bold">LATEST DISBURSEMENT CYCLE</h1>
          {otherLatestDisbursement > 0 ? (
            <ChartContainer config={chartConfig}>
              <PieChart className="xl:py-2">
                <Pie
                  data={sortedLatestDisbursement}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => {
                    if (!name || percent === undefined) return "";
                    return `${name} ${(Number(percent) * 100).toFixed(0)}%`;
                  }}
                >
                  {sortedTotalDisbursement?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full gap-2">
              <NoSymbolIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm">No data available</p>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 ">
        <div className="">
          <h1 className="pl-6 text-sm font-bold ">TOTAL PAID</h1>
          {otherTotalPaid > 0 ? (
            <ChartContainer config={chartConfig}>
              <PieChart className="xl:py-2">
                <Pie
                  data={sortedTotalPaid}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => {
                    if (!name || percent === undefined) return "";
                    return `${name} ${(Number(percent) * 100).toFixed(0)}%`;
                  }}
                >
                  {sortedTotalDisbursement?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full gap-2">
              <NoSymbolIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm">No data available</p>
            </div>
          )}
        </div>
        <div className="">
          <h1 className="pl-6 text-sm font-bold ">LATEST CYCLE PAID</h1>
          {otherLatestPaid > 0 ? (
            <ChartContainer config={chartConfig}>
              <PieChart className="xl:py-2">
                <Pie
                  data={sortedLatestPaid}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => {
                    if (!name || percent === undefined) return "";
                    return `${name} ${(Number(percent) * 100).toFixed(0)}%`;
                  }}
                >
                  {sortedTotalDisbursement?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full gap-2">
              <NoSymbolIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm">No data available</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
