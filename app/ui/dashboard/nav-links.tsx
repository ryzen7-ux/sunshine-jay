"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CurrencyDollarIcon,
  DocumentCurrencyDollarIcon,
  DeviceTabletIcon,
  WrenchScrewdriverIcon,
  UserPlusIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChartNoAxesCombined } from "lucide-react";
import { CogIcon } from "@heroicons/react/16/solid";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    id: "dash",
    name: "Dashboard",
    href: "/dashboard",
    path: "/null",
    icon: HomeIcon,
    dash: "/dashboard",
  },

  {
    id: "dash",
    name: "Mpesa Invoices",
    href: "/dashboard/mpesa",
    path: "/mpesa",
    icon: BanknotesIcon,
  },
  {
    id: "dash",
    name: "Groups",
    href: "/dashboard/customers",
    path: "/customers",
    icon: UserGroupIcon,
  },
  {
    id: "dash",
    name: "Individual Loanees",
    href: "/dashboard/individuals",
    path: "/individual",
    icon: UserPlusIcon,
  },
  {
    id: "dash",
    name: "Loans and Disbursements",
    href: "/dashboard/loans",
    path: "/loans",
    icon: DocumentCurrencyDollarIcon,
  },
  {
    id: "dash",
    name: "Analytics",
    href: "/dashboard/analytics",
    path: "/analytics",
    icon: ChartBarIcon,
  },

  {
    id: "dash",
    name: "System Management",
    href: "/dashboard/system-management",
    path: "/dashboard/system-management",
    icon: WrenchScrewdriverIcon,
  },
  {
    id: "logs",
    name: "System Logs",
    href: "/dashboard/logs",
    path: "/dashboard/logs",
    icon: CogIcon,
  },
];

export default function NavLinks({
  onClose,
  user,
}: {
  onClose: any;
  user: any;
}) {
  const pathname = usePathname();
  console.log(user);
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClose}
            className={clsx(
              `flex h-[48px]  items-center  gap-2 rounded-lg  text-sm font-medium hover:bg-green-200 hover:text-green-600 t px-4 ${link.id === "logs" && user?.name !== "henry-admin" ? "hidden" : ""}`,
              {
                "bg-green-200 text-green-600":
                  pathname === link?.dash || pathname.match(link?.path),
              },
            )}
          >
            <LinkIcon className="w-5 md:w-5 fill-green-700 text-green-700" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
