"use client";

import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { HandCoins } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Card } from "@/app/ui/radix-components/card";
import { FunnelIcon } from "@heroicons/react/16/solid";

export default function RegionFilter({
  maxCycle,
  selectRegions,
}: {
  maxCycle: any;
  selectRegions: any;
}) {
  const cycles = [...Array(maxCycle[0].max ? maxCycle[0].max + 1 : 0)].map(
    (x, i) => ({
      value: String(i),
      label: `Cycle ${i}`,
    }),
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("regionQuery", term);
    } else {
      params.delete("regionQuery");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 0);
  const [select, setSelect] = useState<any>("all");

  return (
    <div className="rounded-2xl  pb-1 bg-fuchsia-800 shadow-xl shadow-green-100 mb-4 mt-6">
      <Card className="rounded-xl rounded-b-2xl bg-white dark:bg-slate-700 px-4 py-0 pt-2 dark:border-0">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-8 w-8 fill-amber-600" />
          <h1 className="text-xl font-extrabold">REGIONS FILTER</h1>
        </div>
        <div className="flex gap-2">
          <div className=" w-full py-2">
            <Select
              size="sm"
              variant="faded"
              color="success"
              className="w-full dark:dark "
              defaultSelectedKeys={[select]}
              endContent={<HandCoins className="text-green-700" />}
              placeholder="Regions"
              description={`Change to view region data for both groups and indiviudal loanees`}
              selectedKeys={[select]}
              onChange={(e) => {
                setSelect(e.target.value);
                handleSearch(e.target.value);
              }}
            >
              <SelectItem key="all" className="dark">
                All Regions
              </SelectItem>
              {selectRegions.map((item: any, index: any) => (
                <SelectItem className={``} key={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </Select>
          </div>{" "}
          {/*<div className=" w-full py-2">*/}
          {/*  <Select*/}
          {/*    size="sm"*/}
          {/*    variant="faded"*/}
          {/*    color="success"*/}
          {/*    className="w-full "*/}
          {/*    defaultSelectedKeys={[select]}*/}
          {/*    endContent={<HandCoins className="text-green-700" />}*/}
          {/*    placeholder="Regions"*/}
          {/*    description={`Change to view region data for both groups and indiviudal loanees`}*/}
          {/*    selectedKeys={[select]}*/}
          {/*    onChange={(e) => {*/}
          {/*      setSelect(e.target.value);*/}
          {/*      handleSearch(e.target.value);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <SelectItem key="all">All Regions</SelectItem>*/}
          {/*    {selectRegions.map((item: any, index: any) => (*/}
          {/*      <SelectItem className={``} key={item.id}>*/}
          {/*        {item.name}*/}
          {/*      </SelectItem>*/}
          {/*    ))}*/}
          {/*  </Select>*/}
          {/*</div>*/}
        </div>
      </Card>
    </div>
  );
}
