"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/radix-components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/app/ui/radix-components/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { PieChart } from "lucide-react";

const chartConfig = {
  disbursed: {
    label: "Disbursed",
    color: "hsl(var(--chart-1))",
  },
  paid: {
    label: "Paid",
    color: "hsl(var(--chart-2))",
  },
  loan: {
    label: "Loan",
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

export function RadixRevenueChart({ charData }: { charData: any }) {
  return (
    <div className="col-span-4">
      <Card className="">
        <CardHeader>
          <CardTitle className="font-bold flex gap-2 items-center">
            <PieChart className="text-indigo-500 w-6 h-6" />
            Loans Overview (Last 12 months)
          </CardTitle>
          <CardDescription className=""></CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={charData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent payload={[]} />} />
              <Bar dataKey="disbursed" fill="#3dc772ff" />
              <Bar dataKey="loan" fill="#df11cdff" />
              <Bar dataKey="paid" fill="#12aeddff" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
