"use client";

import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import {
  Calendar1,
  CalendarDays,
  CalendarRange,
  Users,
  NetworkIcon,
  Disc2,
} from "lucide-react";
import AddStaff from "@/app/ui/system-management/add-staff";
import Staff from "@/app/ui/system-management/staff";
import AddRegion from "@/app/ui/system-management/add-region";
import Regions from "@/app/ui/system-management/regions";
import AddBranch from "@/app/ui/system-management/add-branch";
import Branches from "@/app/ui/system-management/branches";

interface tabsProps {
  users: any;
  currentUser: any;
  regions: any;
  branches: any;
}

export default function SystemTabs({
  users,
  currentUser,
  regions,
  branches,
}: tabsProps) {
  const [selected, setSelected] = useState<any>("staff");

  return (
    <div className="flex flex-col gap-4 w-full">
      <Tabs
        aria-label="Options"
        color="success"
        size="sm"
        variant={"bordered"}
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab
          key="staff"
          title={
            <div className="flex items-center space-x-4">
              <Users
                className={`h-4 w-4 ${
                  selected === "staff" ? "text-white" : "text-cyan-700"
                }`}
              />
              <span
                className={`${
                  selected === "staff" ? "text-white" : "text-gray-900"
                }`}
              >
                STAFF
              </span>
            </div>
          }
        >
          <div className="border rounded-md px-2 pb-6">
            <div className="w-full">
              <AddStaff />
            </div>
            <div className="pb-4">
              <hr className="border-gray-300" />
            </div>
            <div className="mt-2">
              <Staff users={users} currentUser={currentUser} />
            </div>
          </div>
        </Tab>
        <Tab
          key="branches"
          title={
            <div className="flex items-center space-x-4">
              <NetworkIcon
                className={`h-4 w-4 ${
                  selected === "branches" ? "text-white" : "text-pink-700"
                }`}
              />
              <span
                className={`${
                  selected === "branches" ? "text-white" : "text-gray-900"
                }`}
              >
                BRANCHES
              </span>
            </div>
          }
        >
          <div className="border rounded-md px-2 pb-6">
            <div className="w-full">
              <AddBranch users={users} />
            </div>
            <div className="pb-4">
              <hr className="border-gray-300" />
            </div>
            <div className="w-full">
              <Branches
                users={users}
                branches={branches}
                currentUser={currentUser}
              />
            </div>
          </div>
        </Tab>
        <Tab
          key="regions"
          title={
            <div className="flex items-center space-x-4">
              <Disc2
                className={`h-4 w-4 ${
                  selected === "regions" ? "text-white" : "text-green-700"
                }`}
              />
              <span
                className={`${
                  selected === "regions" ? "text-white" : "text-gray-900"
                }`}
              >
                REGIONS
              </span>
            </div>
          }
        >
          <div className="border rounded-md px-2 pb-6">
            <div className="w-full">
              <AddRegion users={users} branches={branches} />
            </div>
            <div className="pb-1">
              <hr className="border-gray-300" />
            </div>
            <div className="w-full">
              <Regions
                users={users}
                regions={regions}
                branches={branches}
                currentUser={currentUser}
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
