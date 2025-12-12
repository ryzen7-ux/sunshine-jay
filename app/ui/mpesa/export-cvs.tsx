"use client";

import { useState, useEffect } from "react";
import { formatDate, formatDateToLocal } from "@/app/lib/utils";
import { Download } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select, SelectItem } from "@heroui/react";

export function ExportMpesaCvs({ ginvoices }: { ginvoices: any }) {
  const [fromForm, setFromForm] = useState("");
  const [toForm, setToForm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("startDate", fromForm);
    params.set("endDate", toForm);

    replace(`${pathname}?${params.toString()}`);
  }, 100);

  useEffect(() => {
    if (fromForm && toForm) {
      handleSearch();
    }
  }, [fromForm, toForm]);

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
          item.phone_number,
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
    <div className="flex gap-4 w-full mt-4">
      <div className="w-full flex items-center gap-4 ">
        <div className="w-full flex items-center">
          {" "}
          <button
            type="button"
            className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={exportInvoice}
          >
            <Download className="me-2 h-4 w-4" />
            Export CVS
          </button>
        </div>
        <div className="w-full flex items-center pb-4">
          {" "}
          <Select
            isRequired
            name="region"
            className=""
            label="Region"
            variant="faded"
            size="md"
            color="success"
            labelPlacement="outside"
          >
            <SelectItem>Ite</SelectItem>
          </Select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-2 items-center w-full">
          <label>From:</label>
          <input
            type="date"
            className="border border-2  rounded-lg border-green-500"
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
            className="border border-2  rounded-lg border-green-500"
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
