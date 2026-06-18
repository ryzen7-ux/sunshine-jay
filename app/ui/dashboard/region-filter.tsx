"use client";

import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { HandCoins, Box, Disc } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function RegionFilter({
  maxCycle,
  selectBranches,
  selectRegions,
}: {
  maxCycle: any;
  selectBranches: any;
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

  const handleBranchSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("branchQuery", term);
      params.set("regionQuery", "all");
    } else {
      params.delete("branchQuery");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 0);

  const [select, setSelect] = useState<any>("all");
  const [selectBranch, setSelectBranch] = useState<any>("all");
  const [filteredSelectRegions, setFilteredSelectRegions] = useState(
    selectRegions ?? [],
  );

  const handleRegionFilter = (value: string) => {
    const filter = selectRegions?.filter(
      (region: any) => region.branch === value,
    );
    setSelect("all");
    setFilteredSelectRegions(value === "all" ? selectRegions : filter);
  };

  return (
    <div className="flex gap-2">
      <div className=" w-full ">
        <Select
          size="sm"
          variant="faded"
          color="success"
          className="w-full dark:dark "
          defaultSelectedKeys={[select]}
          startContent={<Box className="text-green-700" />}
          placeholder="Branches"
          description={`Select branch`}
          selectedKeys={[selectBranch]}
          onChange={(e) => {
            setSelectBranch(e.target.value);
            handleBranchSearch(e.target.value);
            handleRegionFilter(e.target.value);
          }}
        >
          <SelectItem key="all" className="dark">
            All Branches
          </SelectItem>
          {selectBranches?.map((item: any, index: any) => (
            <SelectItem className={`dark`} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </Select>
      </div>{" "}
      <div className=" w-full ">
        <Select
          size="sm"
          variant="faded"
          color="success"
          className="w-full dark:dark "
          defaultSelectedKeys={[select]}
          startContent={<Disc className="text-green-700" />}
          placeholder="Regions"
          description={`Select region`}
          selectedKeys={[select]}
          onChange={(e) => {
            setSelect(e.target.value);
            handleSearch(e.target.value);
          }}
        >
          <SelectItem key="all" className="dark">
            All Regions
          </SelectItem>
          {filteredSelectRegions?.map((item: any, index: any) => (
            <SelectItem className={`dark`} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </Select>
      </div>{" "}
    </div>
  );
}
