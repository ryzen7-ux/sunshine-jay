//@ts-nocheck
"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import StatCards from "@/app/ui/system-management/stat-cards";
import { Shapes } from "lucide-react";
import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/16/solid";
import RegionFilter from "@/app/ui/dashboard/region-filter";

export default function FilterAccordion({
  maxCycle,
  selectBranches,
  selectRegions,
}: {
  maxCycle: any;
  selectBranches: any;
  selectRegions: any;
}) {
  return (
    <Accordion
      defaultExpandedKeys={["1"]}
      variant="splitted"
      className="px-0 mb-4 "
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: "auto",
            overflowY: "unset",
            transition: {
              height: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: "ease",
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            overflowY: "hidden",
            transition: {
              height: {
                easings: "ease",
                duration: 0.25,
              },
              opacity: {
                easings: "ease",
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
      <AccordionItem
        key="1"
        aria-label="Stats"
        className="bg-green-100"
        startContent={<FunnelIcon className="h-8 w-8 fill-amber-600" />}
        subtitle={
          <p className="flex">
            <span className="text-success ml-1">Branches and Regions</span>
          </p>
        }
        title={<h1 className="text-xl font-extrabold">FILTERS</h1>}
      >
        <RegionFilter
          maxCycle={maxCycle}
          selectBranches={selectBranches}
          selectRegions={selectRegions}
        />
      </AccordionItem>
    </Accordion>
  );
}
