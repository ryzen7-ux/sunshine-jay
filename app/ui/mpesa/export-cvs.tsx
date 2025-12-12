"use client";

import { useState, useEffect } from "react";
import {
  formatDate,
  formatDateToLocal,
  formatPhoneNumber,
} from "@/app/lib/utils";
import { Download } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select, SelectItem } from "@heroui/react";
import { start } from "repl";

const items = ["5", "10", "20", "30", "40", "50", "100", "150", "200"];

export function ExportMpesaCvs({ ginvoices }: { ginvoices: any }) {
  const [fromForm, setFromForm] = useState("");
  const [toForm, setToForm] = useState("");
  const [selectItem, setSelectItem] = useState("5");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("startDate", fromForm);
    params.set("endDate", toForm);
    params.set("pageItems", selectItem);
    if (!fromForm) {
      params.delete("startDate");
    }

    if (!toForm) {
      params.delete("endDate");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 100);

  useEffect(() => {
    if (fromForm && toForm) {
      handleSearch();
    }
  }, [fromForm, toForm, selectItem]);

  useEffect(() => {
    handleSearch();
  }, [selectItem]);

  const exportInvoice = () => {
    if (!confirm("Download transaction statement")) {
      return;
    }
    const csvContent = [
      [
        "Name",
        "Reference Number",
        "Phone Number",
        "Transaction Id",
        "Date",
        "Time",
        "Amount",
        "Cycle",
      ].join(","),
      ...ginvoices.map((item: any) =>
        [
          item.first_name,
          item.refnumber,
          formatPhoneNumber(item.phone_number),
          item.transid,
          formatDate(item.transtimee || new Date()),
          item.transamount,
          item.cycle,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MPESA-STATEMENTS-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full mt-4 shadow-lg shadow-green-200 rounded-lg  py-4 px-2">
      <div className="w-full flex justify-between gap-2 ">
        <div className="w-full ">
          <button
            type="button"
            className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={exportInvoice}>
            <Download className="me-2 h-4 w-4" />
            Export CVS
          </button>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4">
          {" "}
          <div className="w-full flex items-center gap-2 ">
            {" "}
            <label htmlFor="fruits">Items per page:</label>
            <select
              id="items"
              name="items"
              className=" bg-white p-0.5 border border-2 border-green-300 text-green-900 text-md rounded-lg
              focus:outline-none focus:border-green-500 focus:ring-green-500
             shadow-sm hover:border-green-400"
              value={selectItem}
              onChange={(e) => setSelectItem(e.target.value)}>
              {items.map((item: any) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="w-full  flex items-center ">
            {" "}
            Showing: {ginvoices?.length || 0} items
          </div> */}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 items-center w-full">
          <label>From:</label>
          <input
            type="date"
            className="bg-white p-0.5 border border-2 border-green-300 text-green-900 text-md rounded-lg
              focus:outline-none focus:border-green-500 focus:ring-green-500
             shadow-sm hover:border-green-400"
            value={fromForm}
            onChange={(e) => {
              setFromForm(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2 items-center w-full">
          <label>To:</label>
          <input
            type="date"
            className="bg-white p-0.5 border border-2 border-green-300 text-green-900 text-md rounded-lg
              focus:outline-none focus:border-green-500 focus:ring-green-500
             shadow-sm hover:border-green-400"
            value={toForm}
            onChange={(e) => {
              setToForm(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
