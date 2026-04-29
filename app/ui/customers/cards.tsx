import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ScaleIcon,
  UsersIcon,
  CircleStackIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/solid";
import { Card as RadixCard } from "@/app/ui/radix-components/card";

const iconMap = {
  disbursed: ScaleIcon,
  collected: BanknotesIcon,
  pending: ClockIcon,
  totalLoan: CircleStackIcon,
  loanBalance: DocumentChartBarIcon,
  total: UsersIcon,
};

export default async function CardWrapper({
  groupDisbusredAmount,
  totalPayment,
  totalMembers,
  balance,
  totalMpesa,
}: {
  groupDisbusredAmount: any;
  totalPayment: any;
  totalMembers: any;
  balance: any;
  totalMpesa: any;
}) {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}
      <Card
        title="Disbursed"
        value={groupDisbusredAmount}
        type="disbursed"
        color="text-blue-600"
        span=""
        background="bg-blue-700"
      />
      <Card
        title="Collected"
        value={totalMpesa}
        type="collected"
        color="text-green-600"
        span=""
        background="bg-green-700"
      />
      <Card
        title="Total Loans"
        value={totalPayment}
        type="totalLoan"
        color="text-pink-600"
        span=""
        background="bg-pink-700"
      />
      <Card
        title="Loan Balance"
        value={balance}
        type="loanBalance"
        color="text-cyan-600"
        span="col-span-1 md:col-span-2"
        background="bg-cyan-700"
      />
      <Card
        title="Total Members"
        value={totalMembers}
        type="total"
        color="text-indigo-600"
        span="col-span-1 md:col-span-1"
        background="bg-indigo-700"
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
  background,
}: {
  title: string;
  value: number | string;
  type:
    | "disbursed"
    | "collected"
    | "pending"
    | "totalLoan"
    | "loanBalance"
    | "total";
  color: string;
  span: string;
  background: string;
}) {
  const Icon = iconMap[type];

  return (
    <div className={`rounded-3xl pl-1.5  ${background}  ${span}`}>
      <RadixCard
        className={`rounded-2xl rounded-b-2xl bg-gray-300 py-0 border-0`}
      >
        <div className="flex p-4">
          {Icon ? <Icon className={`h-6 w-6 ${color}`} /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`
          truncate rounded-b-xl  px-4 py-2 text-center text-green-800 text-lg font-black`}
        >
          {value}
        </p>
      </RadixCard>
    </div>
  );
}
