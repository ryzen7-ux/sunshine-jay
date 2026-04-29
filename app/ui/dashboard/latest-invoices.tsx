"use client";

import {
  ArrowPathIcon,
  UserGroupIcon,
  UserIcon,
  PhoneIcon,
  ClockIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { formatDateToLocal, formatPhoneNumber } from "@/app/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../radix-components/card";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import React from "react";

export default function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: any;
}) {
  // const latestInvoices = await fetchLatestInvoices();
  return (
    <div className="flex w-full flex-col col-span-4 gap-4">
      <div className="font-bold flex gap-2 items-center">
        <CurrencyDollarIcon className="text-green-500 w-6 h-6" />
        LATEST MPESA TRANSACTIONS
      </div>
      <div>
        <InvoiceTable latestInvoices={latestInvoices} />
      </div>
    </div>
  );
}

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "AMOUNT", uid: "amount" },
  { name: "TIME", uid: "time" },
];

export function InvoiceTable({ latestInvoices }: { latestInvoices: any }) {
  const renderCell = React.useCallback((trans: any, columnKey: any) => {
    const cellValue = trans[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg" }}
            description={`${trans.refnumber}`}
            name={trans.first_name}
          ></User>
        );
      case "amount":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-md font-bold text-green-600">
              {trans.transamount}
            </p>
            <p className="text-bold text-sm capitalize text-default-400">
              {trans.transid}
            </p>
          </div>
        );
      case "time":
        return (
          <Chip
            className="capitalize"
            color="secondary"
            size="sm"
            variant="flat"
          >
            {trans.transtime}
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells"
      className="rounded-none"
      isStriped
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={"start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={latestInvoices}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
