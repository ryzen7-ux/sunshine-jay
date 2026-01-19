import {
  ArrowPathIcon,
  UserGroupIcon,
  UserIcon,
  PhoneIcon,
  ClockIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { LatestInvoice } from "@/app/lib/definitions";
import { fetchLatestInvoices } from "@/app/lib/data";
import {
  fetchLatestGroupInvoices,
  fetchLatestMpesaInvoices,
} from "@/app/lib/sun-data";
import { formatDateToLocal, formatPhoneNumber } from "@/app/lib/utils";
import { Coins } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../radix-components/card";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default async function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: any;
}) {
  // const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col col-span-4">
      <Card className="">
        <CardHeader>
          <CardTitle className="font-bold flex gap-2 items-center">
            <CurrencyDollarIcon className="text-green-500 w-6 h-6" />
            Latest Mpesa Transactions
          </CardTitle>
          <CardDescription className=""></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex grow flex-col justify-between rounded-xl bg-green-200 p-2">
            {/* NOTE: Uncomment this code in Chapter 7 */}

            <div className="bg-white pr-2 rounded-xl shadow-lg">
              {latestInvoices.map((invoice: any, i: number) => {
                return (
                  <div
                    key={i}
                    className={clsx("py-1", {
                      "border-t": i !== 0,
                    })}>
                    <div className="pl-2">
                      <DocumentArrowDownIcon className="h-5 w-5 fill-green-700" />
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-center flex-wrap">
                        <div className="min-w-0 ml-6">
                          <p className="truncate text-sm font-semibold md:text-base">
                            Group: {invoice.refnumber}
                          </p>
                          <p className=" text-sm text-gray-700 sm:block">
                            Name: {invoice.first_name} {invoice.middle_name}{" "}
                            {invoice.last_name}
                          </p>
                          <p className=" text-sm text-gray-500 sm:block flex flex-wrap">
                            Phone Number:{" "}
                            {formatPhoneNumber(invoice.phone_number)}
                          </p>
                          <p className=" text-sm text-gray-500 sm:block">
                            Time: {invoice.transtime}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={`truncate text-sm font-extrabold md:text-lg flex justify-center`}>
                          {invoice.transamount}
                        </p>
                        <p
                          className={`truncate text-md text-green-500 font-extrabold pt-2 flex justify-center`}>
                          {invoice.transid}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center pb-2 pt-6">
              <ArrowPathIcon className="h-5 w-5 text-gray-500" />
              <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
