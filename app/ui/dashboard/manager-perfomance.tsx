"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/radix-components/card";
import { TrendingDown, TrendingUp, Zap } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatCurrencyToLocal } from "@/app/lib/utils";

const items = [
  {
    name: "This year",
    addValue: "1 year",
    minusValue: "0 year",
    controlValue: "1",
  },
  {
    name: "This month",
    addValue: "1 month",
    minusValue: "0 month",
    controlValue: "2",
  },
  {
    name: "Last month",
    addValue: "0 month",
    minusValue: "1 month",
    controlValue: "3",
  },
  {
    name: "Last 3 months",
    addValue: "0 month",
    minusValue: "3 month",
    controlValue: "4",
  },
  {
    name: "Last 6 months",
    addValue: "0 month",
    minusValue: "6 month",
    controlValue: "5",
  },
  {
    name: "Last year",
    addValue: "0 year",
    minusValue: "1 year",
    controlValue: "6",
  },
  {
    name: "All",
    addValue: "1 year",
    minusValue: `${new Date().getFullYear() - new Date("2025-01-01").getFullYear()} year`,
    controlValue: "7",
  },
];

export default function DashboardManagerPerformance({
  managersData,
  user,
}: {
  managersData: any;
  user: any;
}) {
  const isAdmin = user[0]?.role === "admin";
  const [selectItem, setSelectItem] = useState("2");
  const [selectMinusItem, setSelectMinusItem] = useState("0 month");
  const [selectAddItem, setSelectAddItem] = useState("0 month");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectItem(e.target.value);
    setSelectAddItem(items[e.target.selectedIndex].addValue);
    setSelectMinusItem(items[e.target.selectedIndex].minusValue);
    handleSearch(e.target.value);
  };

  const handleSearch = useDebouncedCallback((term: any) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("managerAddQuery", selectAddItem);
      params.set("managerMinusQuery", selectMinusItem);
    } else {
      params.delete("managerAddQuery");
      params.delete("managerMinusQuery");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 0);

  const updatedManagersData = managersData?.filter(
    (item: any) => item.manager !== "HENRY-ADMIN",
  );

  const sortedData = updatedManagersData?.sort(
    (a: any, b: any) => b.interest - a.interest,
  );

  return (
    <div className="">
      <Card className="px-0">
        <CardHeader>
          <div className="flex justify-between items-center gap-2 w-full">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 fill-yellow-500 text-yellow-500" />
              <CardTitle className="font-sans font-bold text-md">
                {isAdmin ? "MANAGERS PERFORMANCE" : "MY PERFORMANCE"}
              </CardTitle>
            </div>

            <div className="flex flex-col md:flex-row  gap-4">
              {" "}
              <div className="w-full flex items-center gap-2 ">
                {" "}
                <select
                  id="items"
                  name="items"
                  className=" bg-white p-0.5 border-2 border-green-300 text-green-900 text-md rounded-lg
              focus:outline-none focus:border-green-500 focus:ring-green-500
             shadow-sm hover:border-green-400"
                  value={selectItem}
                  onChange={handleSelectChange}
                >
                  {items.map((item: any, index: number) => (
                    <option value={item.controlValue} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {isAdmin && (
            <CardDescription className="">
              Performance metrics by manager
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedData?.map((item: any, index: number) => (
              <div key={index}>
                {isAdmin && item.manager !== "HENRY-ADMIN" ? (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex flex-col  gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-sans font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-sans font-bold text-md">
                          {item.manager}
                        </p>
                        <div className="flex items-end gap-x-0.5">
                          <p className="text-xs text-muted-foreground">
                            <strong>Disbursed:</strong>{" "}
                            {formatCurrencyToLocal(item.disbursed ?? 0)}
                          </p>
                          {item.is_growth && (
                            <div className="flex items-end gap-0.5">
                              {item.disbursement_growth > 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                              )}
                              <span
                                className={` text-xs ${
                                  item.disbursement_growth > 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {item.disbursement_growth > 0 ? "+" : ""}
                                {item.disbursement_growth}%
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground ">
                          <strong>Loan:</strong>{" "}
                          {formatCurrencyToLocal(item.loan ?? 0)}
                        </p>
                        <p className="text-sm text-muted-foreground ">
                          <strong>Interest:</strong>{" "}
                          {formatCurrencyToLocal(item.interest ?? 0)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-1 text-right">
                      <div>
                        <p className="font-sans font-bold">
                          {formatCurrencyToLocal(item.paid ?? 0)}
                        </p>
                        <div className="flex gap-x-0.5">
                          <p className="text-sm text-muted-foreground ">
                            Paid in
                          </p>
                          {item.is_growth && (
                            <div className="flex items-end gap-1">
                              {item.paid_growth > 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                              )}
                              <span
                                className={` text-xs ${
                                  item.paid_growth > 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {item.paid_growth > 0 ? "+" : ""}
                                {item.paid_growth}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  user[0].id === item.user_id && (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex flex-col  gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-sans font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-sans font-bold text-md">
                            {item.manager}
                          </p>
                          <div className="flex items-end gap-x-0.5">
                            <p className="text-xs text-muted-foreground">
                              <strong>Disbursed:</strong>{" "}
                              {formatCurrencyToLocal(item.disbursed ?? 0)}
                            </p>
                            {item.is_growth && (
                              <div className="flex items-end gap-0.5">
                                {item.disbursement_growth > 0 ? (
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-red-500" />
                                )}
                                <span
                                  className={` text-xs ${
                                    item.disbursement_growth > 0
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {item.disbursement_growth > 0 ? "+" : ""}
                                  {item.disbursement_growth}%
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground ">
                            <strong>Loan:</strong>{" "}
                            {formatCurrencyToLocal(item.loan ?? 0)}
                          </p>
                          <p className="text-sm text-muted-foreground ">
                            <strong>Interest:</strong>{" "}
                            {formatCurrencyToLocal(item.interest ?? 0)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-1 text-right">
                        <div>
                          <p className="font-sans font-bold">
                            {formatCurrencyToLocal(item.paid ?? 0)}
                          </p>
                          <div className="flex gap-x-0.5">
                            <p className="text-sm text-muted-foreground ">
                              Paid in
                            </p>
                            {item.is_growth && (
                              <div className="flex items-end gap-1">
                                {item.paid_growth > 0 ? (
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-red-500" />
                                )}
                                <span
                                  className={` text-xs ${
                                    item.paid_growth > 0
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {item.paid_growth > 0 ? "+" : ""}
                                  {item.paid_growth}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
