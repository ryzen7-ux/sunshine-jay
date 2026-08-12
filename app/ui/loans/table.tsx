"use client";

import {
  UpdateLoan,
  DeleteLoan,
  UploadLoanDocument,
} from "@/app/ui/loans/buttons";
import InvoiceStatus from "@/app/ui/loans/status";
import {
  formatDateToLocal,
  formatCurrencyToLocal,
  formatPercentage,
} from "@/app/lib/utils";
import { Chip } from "@heroui/react";
import { ClockIcon, UserIcon } from "@heroicons/react/24/solid";
import { CalendarArrowDownIcon, CalendarArrowUpIcon } from "lucide-react";
import { LoansHeroTable } from "@/app/ui/loans/loans-table";

export default function InvoicesTable({
  user,
  loans,
}: {
  query: string;
  currentPage: number;
  loan: any;
  user: any;
  loans: any;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2 md:pt-0 w-full">
          <div className="md:hidden">
            {loans?.map((loan: any, index: any) => (
              <div
                key={index}
                className="mb-2 w-full rounded-xl bg-gray-300 p-2 border-1.5 "
              >
                <div className="flex justify-between border-b border-green-600 pb-1">
                  <div>
                    <div className="flex gap-2 items-center">
                      <UserIcon className="text-success-600 h-10 w-10" />
                      <div className="flex flex-col">
                        <p className="text-sm font-bold uppercase">
                          {loan.firstname} {loan.surname}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="uppercase">{loan.name}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      {" "}
                      <Chip
                        size="sm"
                        radius="sm"
                        color="secondary"
                        variant="light"
                        startContent={
                          <CalendarArrowUpIcon className="h-4 w-4" />
                        }
                      >
                        Start - {formatDateToLocal(loan.start_date) ?? "Nill"}
                      </Chip>
                      <Chip
                        size="sm"
                        radius="sm"
                        color="secondary"
                        variant="light"
                        startContent={
                          <CalendarArrowDownIcon className="h-4 w-4" />
                        }
                      >
                        End - {formatDateToLocal(loan.end_date) ?? "Nill"}
                      </Chip>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end gap-2">
                    <Chip
                      className="flex w-full"
                      size="md"
                      radius="sm"
                      color="secondary"
                      variant="light"
                      startContent={<ClockIcon className={" h-4 w-4"} />}
                    >
                      {formatDateToLocal(loan.date)}
                    </Chip>
                    <div className="flex justify-end w-full mb-2">
                      <Chip
                        className="text-xs"
                        size="sm"
                        color="secondary"
                        variant="bordered"
                      >
                        {`Cycle: ${loan.cycle}`}
                      </Chip>
                    </div>
                    <p className="flex justify-end w-full text-xs font-extrabold text-purple-500">
                      {" "}
                      <InvoiceStatus status={loan.status} />
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-1.5">
                  <div className="flex flex-col gap-1.5">
                    <Chip color="success" size="md" variant="flat">
                      Fee: {formatCurrencyToLocal(Number(loan.fee))}
                    </Chip>
                    <Chip color="success" size="md" variant="flat">
                      Principle: {formatCurrencyToLocal(Number(loan.amount))}
                    </Chip>
                    <Chip color="success" size="md" variant="flat">
                      Loan Amount: {formatCurrencyToLocal(Number(loan.total))}
                    </Chip>

                    <p className="text-lg font-extrabold text-emerald-700">
                      TOTAL:{" "}
                      {formatCurrencyToLocal(
                        Number(loan.total) + Number(loan.fee),
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Chip color="success" size="md" variant="flat">
                      Term: {Math.trunc(loan.term) ?? 0} weeks
                    </Chip>
                    <Chip color="success" size="md" variant="flat">
                      Interest:{" "}
                      {formatPercentage.format(
                        Math.trunc(Number(loan.interest ?? 0)) / 100,
                      )}
                    </Chip>

                    <div className="flex gap-1">
                      {" "}
                      <UploadLoanDocument loan={loan} user={user[0]} />
                      <UpdateLoan id={loan.id} loan={loan} user={user} />
                      <DeleteLoan id={loan.id} user={user} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto hidden md:block">
            <LoansHeroTable loan={loans} user={user} />
          </div>
        </div>
      </div>
      <div>
        {loans.length < 1 && (
          <div className="text-sm flex items-center justify-center py-6">
            No loans are added
          </div>
        )}
      </div>
    </div>
  );
}
