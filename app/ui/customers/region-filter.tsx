"use client";

import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { HandCoins, Box, Disc, Funnel } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function RegionFilterGroups({
  isAdmin,
  currentUserId,
  selectBranches,
  selectRegions,
}: {
  isAdmin: boolean;
  currentUserId: string;
  selectBranches: any;
  selectRegions: any;
}) {
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
    <div className="flex gap-2 mb-5">
      {isAdmin && (
        <div className=" w-full">
          <Select
            size="sm"
            variant="faded"
            color="success"
            className="w-full dark:dark "
            defaultSelectedKeys={[select]}
            startContent={<Funnel className="text-green-700" />}
            placeholder="Branches"
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
        </div>
      )}
      <div className={`w-full ${!isAdmin && "md:w-1/2"}`}>
        <Select
          size="sm"
          variant="faded"
          color="success"
          className="w-full dark:dark "
          defaultSelectedKeys={[select]}
          startContent={<Funnel className="text-green-700" />}
          placeholder="Regions"
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
