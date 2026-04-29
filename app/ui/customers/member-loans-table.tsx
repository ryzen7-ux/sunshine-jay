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

export const columns = [
  { name: "STATUS", uid: "status" },
  { name: "CYCLE", uid: "cycle" },
  { name: "PRINCIPLE", uid: "principle" },
  { name: "TERM (WEEKS)", uid: "term" },
  { name: "INTEREST", uid: "interest" },
  { name: "FEE", uid: "fee" },
  { name: "LOAN AMOUNT", uid: "amount" },
  { name: "TOTAL", uid: "total" },
  { name: "START DATE", uid: "start" },
  { name: "END DATE", uid: "end" },
];

export function MemberLoanTable({ loan }: { loan: any }) {
  const renderCell = React.useCallback((loan: any, columnKey: any) => {
    const cellValue = loan[columnKey];

    switch (columnKey) {
      case "status":
        return <InvoiceStatus status={loan.status} />;
      case "cycle":
        return <p className="text-bold text-xs font-bold ">{loan.cycle}</p>;
      case "principle":
        return (
          <p className="text-bold text-xs font-bold ">
            {formatCurrencyToLocal(Number(loan.amount))}
          </p>
        );
      case "term":
        return (
          <p className="text-bold text-xs font-bold ">
            {Math.trunc(loan.term) ?? 0}
          </p>
        );
      case "interest":
        return (
          <p className="text-bold text-xs font-bold">
            {formatPercentage.format(Number(loan.interest ?? 0) / 100)}
          </p>
        );
      case "fee":
        return (
          <p className="text-bold text-xs font-bold ">
            {formatCurrencyToLocal(Number(loan.fee))}
          </p>
        );
      case "amount":
        return (
          <p className="text-bold text-xs font-bold ">
            {formatCurrencyToLocal(Number(loan.total))}
          </p>
        );

      case "total":
        return (
          <p className="text-bold text-xs font-extrabold ">
            {formatCurrencyToLocal(Number(loan.total) + Number(loan.fee))}
          </p>
        );
      case "start":
        return (
          <Chip
            className="capitalize"
            color="secondary"
            size="sm"
            variant="flat"
          >
            {formatDateToLocal(loan.start_date) ?? "None"}
          </Chip>
        );
      case "end":
        return (
          <Chip
            className="capitalize"
            color="secondary"
            size="sm"
            variant="flat"
          >
            {formatDateToLocal(loan.end_date) ?? "None"}
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-full overflow-auto">
      {" "}
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
    </div>
  );
}
