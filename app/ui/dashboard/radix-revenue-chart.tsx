"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/radix-components/card";
import { Button } from "@/app/ui/radix-components/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/app/ui/radix-components/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { PieChart } from "lucide-react";

// Mock data for business analytics
const revenueData = [
  {
    month: "Jan",
    disbursed: 8500,
    paid: 6200,
    profit: 2300,
    ads: 45,
    sponsors: 12,
  },
  {
    month: "Feb",
    disbursed: 9200,
    paid: 6800,
    profit: 2400,
    ads: 52,
    sponsors: 15,
  },
  {
    month: "Mar",
    disbursed: 10100,
    paid: 7200,
    profit: 2900,
    ads: 58,
    sponsors: 18,
  },
  {
    month: "Apr",
    disbursed: 11300,
    paid: 7800,
    profit: 3500,
    ads: 62,
    sponsors: 20,
  },
  {
    month: "May",
    disbursed: 12450,
    paid: 8200,
    profit: 4250,
    ads: 68,
    sponsors: 22,
  },
  {
    month: "Jun",
    disbursed: 13200,
    paid: 8600,
    profit: 4600,
    ads: 72,
    sponsors: 25,
  },
];

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
            Loans Overview (Last 5 months)
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
