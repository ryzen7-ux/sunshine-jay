"use client";

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
} from "@heroui/react";
import React from "react";
import {
  formatCurrencyToLocal,
  formatDateToLocal,
  formatPercentage,
} from "@/app/lib/utils";
import InvoiceStatus from "@/app/ui/loans/status";
import {
  DeleteLoan,
  UpdateLoan,
  UploadLoanDocument,
} from "@/app/ui/loans/buttons";
import { UserIcon } from "@heroicons/react/24/solid";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "GROUP", uid: "group" },
  { name: "STATUS", uid: "status" },

  { name: "PRINCIPLE", uid: "principle" },

  { name: "INTEREST", uid: "interest" },
  { name: "LOAN AMOUNT", uid: "amount" },
  { name: "PERIOD", uid: "period" },
  { name: "ACTIONS", uid: "actions" },
];

export function LoansHeroTable({ loan, user }: { loan: any; user: any }) {
  const renderCell = React.useCallback((loan: any, columnKey: any) => {
    const cellValue = loan[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-1">
            <UserIcon className="h-6 w-6 text-teal-700" />
            <p className="flex font-bold text-xs uppercase ">
              {loan.firstname} {loan.surname}
            </p>
          </div>
        );
      case "group":
        return <p className="text-bold text-xs uppercase">{loan.name}</p>;
      case "status":
        return (
          <div className="flex flex-col gap-1">
            <InvoiceStatus status={loan.status} />
            <Chip color="primary" variant="bordered" size="sm">
              Cycle: {loan.cycle}
            </Chip>
          </div>
        );

      case "principle":
        return (
          <div className="flex flex-col gap-1">
            <Chip color="warning" variant="flat" size="sm">
              {formatCurrencyToLocal(Number(loan.amount))}
            </Chip>
            <Chip color="warning" variant="flat" size="sm">
              Term: {Math.trunc(loan.term) ?? 0} weeks
            </Chip>
          </div>
        );

      case "interest":
        return (
          <div className="flex flex-col gap-1">
            <Chip className="" color="success" variant="flat" size="sm">
              {formatPercentage.format(Number(loan.interest ?? 0) / 100)}
            </Chip>
            <Chip className="" color="success" variant="flat" size="sm">
              Fee: {formatCurrencyToLocal(Number(loan.fee))}
            </Chip>
          </div>
        );

      case "amount":
        return (
          <div className="flex flex-col gap-1">
            <Chip className="" color="primary" variant="flat" size="sm">
              Amount: {formatCurrencyToLocal(Number(loan.total))}
            </Chip>
            <Chip className="" color="primary" variant="flat" size="sm">
              Total:{" "}
              {formatCurrencyToLocal(Number(loan.total) + Number(loan.fee))}
            </Chip>
          </div>
        );

      case "period":
        return (
          <div className="flex flex-col gap-1">
            <Chip
              className="capitalize"
              color="secondary"
              size="sm"
              variant="flat"
            >
              Start - {formatDateToLocal(loan.start_date) ?? "None"}
            </Chip>
            <Chip color="secondary" size="sm" variant="flat">
              End - {formatDateToLocal(loan.end_date) ?? "None"}
            </Chip>
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-end gap-1">
            <UploadLoanDocument loan={loan} user={user[0]} />
            <UpdateLoan id={loan.id} loan={loan} user={user} />
            <DeleteLoan id={loan.id} user={user} />
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells"
      className="rounded-none md:w-screen lg:w-full"
      isStriped
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={loan}>
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
