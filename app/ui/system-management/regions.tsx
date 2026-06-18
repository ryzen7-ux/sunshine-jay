"use client";

import { Aperture, Disc3, Filter } from "lucide-react";
import EditRegion from "@/app/ui/system-management/edit-region";
import { DeleteRegion } from "@/app/ui/system-management/delete-region";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";

export default function Regions({
  users,
  regions,
  branches,
  currentUser,
}: {
  users: any;
  regions: any;
  branches: any;
  currentUser: any;
}) {
  const [selectFilter, setSelectFilter] = useState("default");
  const [filteredRegions, setFilteredRegions] = useState(regions);

  const handleFilter = (value: string) => {
    const filter = regions.filter(
      (item: any, index: number) => item.branch === value,
    );
    setFilteredRegions(value === "default" ? regions : filter);
  };

  useEffect(() => {
    setFilteredRegions(regions);
  }, [regions]);
  return (
    <>
      <div className="mb-6">
        <div className="bg-white pr-2 rounded-xl  bg-gray-200 ">
          <div className="px-2 py-4 w-full ">
            <Select
              name="branch"
              className=""
              variant="flat"
              size="lg"
              color="success"
              startContent={<Filter className="h-4 w-4 text-green-500" />}
              selectedKeys={[selectFilter]}
              onChange={(e) => {
                setSelectFilter(e.target.value);
                handleFilter(e.target.value);
              }}
            >
              <SelectItem key="default">All Branches </SelectItem>
              {branches?.map((branch: any, index: any) => (
                <SelectItem key={branch.id}>{branch.name}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex grow flex-col justify-between rounded-xl py-2 px-2 ">
            {filteredRegions?.length > 0 ? (
              filteredRegions?.map((region: any) => (
                <div
                  key={region.id}
                  className={`border rounded-md  py-2 my-0.5 bg-green-50 hover:bg-green-100 ${
                    region.name === "default" ? "hidden" : ""
                  }`}
                >
                  <div className="px-2 flex justify-between">
                    <div className="flex gap-2">
                      <Disc3 className="h-8 w-8 text-amber-500" />
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex items-center flex-wrap">
                          <div className="min-w-0 ml-1">
                            <p className="truncate text-sm font-semibold md:text-lg">
                              {region.name}
                            </p>
                            <p className=" text-sm text-gray-700 sm:block">
                              Branch: {region.branch_name}
                            </p>
                            <p className=" text-sm text-gray-700 sm:block">
                              County: {region.county}
                            </p>
                            <p className=" text-sm text-gray-500 sm:block flex flex-wrap">
                              Manager: {region.custodian}
                            </p>
                            <p className=" text-sm text-gray-500 sm:block"></p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <p
                            className={`truncate text-sm font-extrabold md:text-lg flex justify-center`}
                          ></p>
                          <p
                            className={`truncate text-md text-green-500 font-extrabold pt-2 flex justify-center`}
                          ></p>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <EditRegion
                        users={users}
                        region={region}
                        branches={branches}
                      />
                      <DeleteRegion id={region.id} currentUser={currentUser} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full flex items-center justify-center text-sm">
                No regions to show. Add regions to branch.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
