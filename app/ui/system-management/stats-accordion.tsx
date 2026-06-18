// @ts-nocheck
"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import StatCards from "@/app/ui/system-management/stat-cards";
import { Shapes } from "lucide-react";
import { useState } from "react";

export default function StatsAccordion({
  staff_count,
  branches_count,
  regions_count,
}: {
  staff_count: any;
  branches_count: any;
  regions_count: any;
}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["2"]));
  console.log(selectedKeys);
  return (
    <Accordion
      variant="splitted"
      className="px-0 mb-4"
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
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <AccordionItem
        key="1"
        aria-label="Stats"
        startContent={<Shapes className="text-primary h-8 w-8" />}
        subtitle={
          <p className="flex">
            <span className="text-primary ml-1">View</span>
          </p>
        }
        title="System Stats"
      >
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3 mb-6">
          <StatCards
            staff_count={staff_count}
            regions_count={regions_count}
            branches_count={branches_count}
          />
        </div>
      </AccordionItem>
    </Accordion>
  );
}
