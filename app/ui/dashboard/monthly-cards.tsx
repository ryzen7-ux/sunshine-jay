import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ScaleIcon,
  UsersIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CircleStackIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data/data";
import {
  formatDateToLocal,
  formatCurrency,
  formatCurrencyToLocal,
} from "@/app/lib/utils";
import { fetchDashboardCardData } from "@/app/lib/data/sun-data";
import { select } from "@heroui/theme";
import { Card as RadixCard } from "@/app/ui/radix-components/card";
import { HandCoinsIcon } from "lucide-react";

const iconMap = {
  disbursed: HandCoinsIcon,
  collected: BanknotesIcon,
  customers: UsersIcon,
  active: ScaleIcon,
  pending: CreditCardIcon,
};

interface tabsProps {
  monthlyDisbursement: any;
  monthlyTotalLoan: any;
  monthlyLoanBalance: any;
  monthlyCollected: any;
  numberOfMembers: any;
  user: any;
  groupCycle: any;
  selected: any;
}

export default function MothlyCardWrapper({
  monthlyDisbursement,
  monthlyTotalLoan,
  monthlyLoanBalance,
  monthlyCollected,
  numberOfMembers,
  groupCycle,
  user,
  selected,
}: tabsProps) {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card
        title="DISBURSED"
        value={monthlyDisbursement ?? 0}
        type="disbursed"
        color="text-indigo-600"
        span=""
        user={user}
        selected={select}
        background="bg-indigo-700"
      />
      <Card
        title="PAID"
        value={Number(monthlyCollected ?? 0)}
        type="collected"
        color="text-rose-600"
        span=""
        user={user}
        selected={select}
        background="bg-rose-700"
      />
      <Card
        title="LOANS"
        value={Number(monthlyTotalLoan ?? 0)}
        type="pending"
        color="text-orange-600"
        span=""
        user={user}
        selected={select}
        background="bg-orange-700"
      />
      <Card
        title={`LOAN BALANCE`}
        value={monthlyLoanBalance ?? 0}
        type="active"
        color="text-teal-600"
        span=""
        user={user}
        selected={select}
        background="bg-teal-700"
      />
      <Card
        title="TOTAL LOANEES"
        value={numberOfMembers ?? 0}
        type="customers"
        color="text-pink-600"
        span="col-span-2 md:col-span-2"
        user={user}
        selected={select}
        background="bg-pink-700"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
  color,
  span,
  user,
  selected,
  background,
}: {
  title: string;
  value: number;
  type: "disbursed" | "collected" | "pending" | "active" | "customers";
  color: string;
  span: string;
  user: any;
  selected: any;
  background: string;
}) {
  const Icon = iconMap[type];

  return (
    <div className={`rounded-3xl pl-1.5 ${background} ${span} `}>
      <RadixCard
        className={`rounded-2xl rounded-b-2xl bg-gray-300 py-0 border-0`}
      >
        <div className="flex items-center p-2">
          {Icon ? <Icon className={`h-6 w-6 ${color}`} /> : null}
          <h3 className="ml-2 text-xs font-extrabold">{title}</h3>
        </div>
        <p
          className={`
          truncate pb-1.5 text-center justify-center text-green-800 text-sm font-black`}
        >
          {type === "customers" ? (value ?? 0) : formatCurrencyToLocal(value)}
        </p>
      </RadixCard>
    </div>
  );
}
