"use client";
import Image from "next/image";
import { DeleteInvoice } from "@/app/ui/mpesa/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import {
  formatDateToLocal,
  formatCurrency,
  formatCurrencyToLocal,
  formatPhoneNumber,
  categorizeDate,
} from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data/data";
import { fetchFilteredMpesaInvoices } from "@/app/lib/data/sun-data";
import { fetchFilteredMpesaInvoices2 } from "@/app/lib/data/sun-data2";
import EditMpesa from "@/app/ui/mpesa/edit-mpesa";
import { Badge, Button, Chip } from "@heroui/react";
import { Download } from "lucide-react";
import { exportCvs } from "@/app/lib/cvs";
import {
  PhoneIcon,
  UserIcon,
  ClockIcon,
  CalendarIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";
import { invoices } from "@/app/lib/placeholder-data";

export default function InvoicesTable({
  query,
  currentPage,
  user,
  startDate,
  endDate,
  ginvoices,
}: {
  query: string;
  currentPage: number;
  user: any;
  startDate: any;
  endDate: any;
  ginvoices: any;
}) {
  const isSuperAdmin = user.name === "henry-admin";

  console.log(categorizeDate(ginvoices[0].transtime), ginvoices[0].transtime);
  if (!ginvoices || ginvoices.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        <p>No invoices found.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg  md:pt-0">
          <div className="md:hidden">
            {ginvoices?.map((invoice: any, index: any) => (
              <div
                key={index}
                className="mb-2 w-full rounded-xl bg-gray-300 p-2 border-1.5 "
              >
                <div className="flex justify-between border-b border-green-600 pb-1">
                  <div>
                    <div className="flex gap-2 items-center">
                      <UserIcon className="text-primary-600 h-10 w-10" />
                      <div className="flex flex-col">
                        <p className="text-sm font-bold uppercase">
                          {invoice.refnumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="uppercase">
                            {invoice.first_name}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      {" "}
                      <Chip
                        size="md"
                        radius="sm"
                        color="secondary"
                        variant="light"
                        startContent={
                          <DevicePhoneMobileIcon className="h-4 w-4" />
                        }
                      >
                        {formatPhoneNumber(invoice.phone_number)}
                      </Chip>
                      <Chip
                        size="sm"
                        radius="sm"
                        color="secondary"
                        variant="light"
                        startContent={<CalendarIcon className="h-4 w-4" />}
                      >
                        {`${categorizeDate(invoice.transtime)}`}
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
                      {formatDateToLocal(invoice.transtime)}
                    </Chip>
                    <div className="flex justify-end w-full mb-2">
                      <Chip
                        className="text-xs"
                        size="sm"
                        color="secondary"
                        variant="bordered"
                      >
                        {`Cycle: ${invoice.cycle}`}
                      </Chip>
                    </div>
                    <p className="flex justify-end w-full text-xs font-extrabold text-purple-500">
                      {invoice.transid}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-1.5">
                  <div>
                    <p className="text-lg font-extrabold text-emerald-700">
                      {formatCurrencyToLocal(invoice.transamount)}
                    </p>
                  </div>
                  {user?.role === "admin" && (
                    <div className="flex gap-3 justify-end">
                      {" "}
                      <EditMpesa mpesa={invoice} user={user} />
                      <DeleteInvoice id={invoice.id} user={user} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className=" py-2 font-medium  pl-2">
                  Group/ID Number
                </th>
                <th>Name</th>
                <th>Phone Number</th>

                <th scope="col" className="py-2 font-medium">
                  Amount
                </th>
                <th scope="col" className=" py-2 font-medium">
                  Date
                </th>
                <th scope="col" className=" py-2 font-medium">
                  Transaction ID
                </th>
                <th scope="col" className=" py-2 font-medium">
                  Paid Cycle
                </th>
                <th scope="col" className="relative   ">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ginvoices?.map((invoice: any, index: any) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-1 pr-3 pl-2">
                    <div className="flex items-center gap-3">
                      <p className="text-xs">{invoice.refnumber}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap pr-3">
                    <div className="flex items-center gap-3">
                      <p className="text-xs">
                        {invoice.first_name} {invoice.last_name}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap pr-3 ">
                    <div className="flex items-center gap-3">
                      <p className="text-xs">
                        {formatPhoneNumber(invoice.phone_number)}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap pr-3 text-xs">
                    {formatCurrencyToLocal(invoice.transamount)}
                  </td>
                  <td className="whitespace-nowrap py-3 text-xs flex justify-start pr-3">
                    {formatDateToLocal(invoice.transtime)}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 pr-3 text-xs text-green-500 font-extrabold ">
                    {invoice.transid}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 pr-3 text-xs text-green-500 font-extrabold ">
                    {invoice.cycle}
                  </td>
                  <td className=" flex pr-4 py-2">
                    {user?.role === "admin" && (
                      <>
                        {" "}
                        <EditMpesa mpesa={invoice} user={user} />
                        <DeleteInvoice id={invoice.id} user={user} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
