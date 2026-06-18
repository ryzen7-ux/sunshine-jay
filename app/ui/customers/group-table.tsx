"use client";

import React from "react";
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

import Link from "next/link";
import { deleteGroup } from "@/app/lib/sun-actions";
import { DeleteGroupAction } from "@/app/ui/customers/table-actions";
import { formatCurrencyToLocal } from "@/app/lib/utils";
import EditGroupModal from "@/app/ui/customers/edit-group-modal";
import Regions from "../system-management/regions";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "LOCATION", uid: "location" },
  { name: "BRANCH", uid: "branch_name" },
  { name: "REGION", uid: "region_name" },
  { name: "ACTIVE DISBURSEMENT", uid: "disbursed" },
  { name: "MEMBERS", uid: "members_count" },
  { name: "ACTIONS", uid: "actions" },
];

export const EyeIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function GroupTable({
  groups,
  regions,
  user,
}: {
  groups: any;
  regions: any;
  user: any;
}) {
  const renderCell = React.useCallback((group: any, columnKey: any) => {
    const cellValue = group[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className=" text-xs uppercase">{cellValue}</p>
          </div>
        );
      case "location":
        return (
          <div>
            <p className="text-bold text-xs uppercase">{cellValue}</p>
          </div>
        );
      case "branch_name":
        return (
          <div>
            <p className="text-bold text-xs uppercase">{cellValue}</p>
          </div>
        );

      case "region_name":
        return (
          <div>
            <p className="text-bold text-xs uppercase">{cellValue}</p>
          </div>
        );
      case "disbursed":
        return (
          <div>
            <p className="text-bold text-xs">
              {formatCurrencyToLocal(Number(cellValue))}
            </p>
          </div>
        );
      case "members_count":
        return (
          <div>
            <p className="flext justify-center text-bold text-xs">
              {cellValue}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex justify-center gap-3">
            <Tooltip color="warning" content="Group details">
              <Link href={`/dashboard/customers/${group.id}/details`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon className="h-5 w-5 text-yellow-500" />
                </span>
              </Link>
            </Tooltip>

            <Tooltip color="success" content="Edit group">
              <EditGroupModal group={group} regions={regions} user={user} />
            </Tooltip>
            {user?.role === "admin" && (
              <Tooltip color="danger" content="Delete group info">
                <DeleteGroupAction id={group.id} user={user} />
              </Tooltip>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      isStriped
      aria-label="Example table with custom cells"
      color="success"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      {Object.keys(groups).length > 0 ? (
        <TableBody items={groups}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      )}
    </Table>
  );
}
