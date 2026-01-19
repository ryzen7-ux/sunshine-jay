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
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChartNoAxesCombined } from "lucide-react";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    path: "/null",
    icon: HomeIcon,
    dash: "/dashboard",
  },
  //   {
  //   name: "Individuals",
  //   href: "/dashboard/invoices",
  //   path: "/invoices",
  //   icon: UserPlusIcon,
  // },

  {
    name: "Mpesa Invoices",
    href: "/dashboard/mpesa",
    path: "/mpesa",
    icon: BanknotesIcon,
  },
  {
    name: "Groups",
    href: "/dashboard/customers",
    path: "/customers",
    icon: UserGroupIcon,
  },
  {
    name: "Individual Loanees",
    href: "/dashboard/individuals",
    path: "/individual",
    icon: UserPlusIcon,
  },
  {
    name: "Loans and Disbursements",
    href: "/dashboard/loans",
    path: "/loans",
    icon: DocumentCurrencyDollarIcon,
  },
  // {
  //   name: "Analytics",
  //   href: "/dashboard/analytics",
  //   path: "/analytics",
  //   icon: ChartNoAxesCombined,
  // },

  {
    name: "System Management",
    href: "/dashboard/system-management",
    path: "/dashboard/system-management",
    icon: WrenchScrewdriverIcon,
  },
];

export default function NavLinks({ onClose }: { onClose: any }) {
  const pathname = usePathname();
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
              "flex  h-[48px]  items-center  gap-2 rounded-lg  text-sm font-medium hover:bg-green-200 hover:text-green-600 t px-4",
              {
                "bg-green-200 text-green-600":
                  pathname === link?.dash || pathname.match(link?.path),
              },
            )}>
            <LinkIcon className="w-5 md:w-5 fill-green-700 text-green-700" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
