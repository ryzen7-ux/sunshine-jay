"use client";

import React, { useEffect } from "react";
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
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { EditMemberModal } from "./edit-meber-modal";
import Link from "next/link";
import { deleteGroup } from "@/app/lib/sun-actions";
import { DeleteMemberAction } from "@/app/ui/customers/table-actions";
import MemberModal from "@/app/ui/customers/member-modal";
import { AddFileModal } from "@/app/ui/customers/add-file-modal";
import LoanModal from "@/app/ui/customers/loan-modal";
import { BanknotesIcon } from "@heroicons/react/20/solid";
import { EditIcon, DeleteIcon, EyeIcon, File } from "lucide-react";
import MemberStatus from "@/app/ui/customers/status";
import { loans } from "@/app/lib/placeholder-data";

export const columns = [
  { name: "ID NO", uid: "idnumber" },
  { name: "NAME", uid: "firstname" },
  { name: "PHONE", uid: "phone" },
  { name: "BUSINESS", uid: "business" },
  { name: "MEMBERSHIP STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function MembersTable({
  group,
  members,
  loan,
  user,
}: {
  group: any;
  members: any;
  loan: any;
  user: any;
}) {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isOpenLoan, setIsOpenLoan] = React.useState(false);
  const [memberLoan, setMemberLoan] = React.useState([]);
  const [modalMember, setModalMember] = React.useState(null);

  const [memberData, setMemberData] = React.useState({});

  useEffect(() => {
    setMemberLoan(loan);
  }, [loan]);
  console.log(memberLoan);
  const renderCell = React.useCallback((member: any, columnKey: any) => {
    const cellValue = member[columnKey];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col flex-nowrap">
            <p className="py-2 text-xs">{member.idnumber}</p>
          </div>
        );
      case "firstname":
        return (
          <div className="flex flex-col">
            <p className=" text-bold text-xs ">
              {member.firstname} {member.surname}
            </p>
          </div>
        );
      case "business":
        return (
          <div>
            <p className="text-bold text-xs ">{member.nature}</p>
          </div>
        );
      case "status":
        return (
          <>
            <MemberStatus status={member.status} />
          </>
        );

      case "actions":
        return (
          <div className="relative flex justify-center gap-4">
            <AddFileModal member={member} loanee="member" user={user} />
            <Tooltip color="primary" content="New loan">
              <button
                onClick={() => {
                  setIsOpenLoan(true);
                  setMemberData(member);
                }}
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <BanknotesIcon className="h-5 w-5 fill-blue-500" />
                </span>
              </button>
            </Tooltip>
            <>
              <Tooltip color="warning" content="Member Details">
                <button
                  onClick={() => {
                    setModalMember(member);
                    setIsAddModalOpen(true);
                  }}
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon className="h-6 w-6 text-yellow-500" />
                  </span>
                </button>
              </Tooltip>
            </>

            <Tooltip color="success" content="Edit member">
              <EditMemberModal member={member} user={user} />
            </Tooltip>

            {user.role === "admin" && (
              <DeleteMemberAction id={member.id} gid={group.id} user={user} />
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table
        isStriped
        aria-label="Example table with custom cells"
        color="success"
        className="pb-12 mb-12"
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
        {Object.keys(members).length > 0 ? (
          <TableBody items={members}>
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
      <LoanModal
        isOpen={isOpenLoan}
        onOpenChange={setIsOpenLoan}
        memberData={memberData}
        onClose={onClose}
      />
      <MemberModal
        memberData={modalMember}
        loan={memberLoan}
        group={group}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </>
  );
}
