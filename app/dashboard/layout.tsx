import SideNav from "@/app/ui/dashboard/sidenav";
import UserAvatar from "@/app/ui/user-avatar";
import { auth } from "@/auth";

import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { SidebarCollapsible } from "../ui/dashboard/sidebar-collapsible";
import Image from "next/image";
import Link from "next/link";

// export const experimental_ppr = true; // Enable PPR

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userTypes = {
    id: "",
    email: "",
    name: "",
    password: "",
    is_admin: false,
  };
  const cookie = (await cookies()).get("user-session")?.value!;
  const user = JSON.parse(cookie);

  return (
    <div className="">
      {/* <div className="w-full flex-none md:w-64 ">
        <SideNav user={user} />
      </div> */}
      <div className="flex justify-between bg-blue-200 pr-4">
        <div className="flex ">
          {" "}
          <SidebarCollapsible user={user} />
          <Link href="/dashboard" className="pt-2">
            {" "}
            <Image
              src="/logo.png"
              width={100}
              height={50}
              alt="Screenshots of the dashboard project showing desktop version"
            />
          </Link>
        </div>
        <div className="pt-4">
          <UserAvatar user={user ?? userTypes} />
        </div>
      </div>
      <div className="flex-grow p-2 md:overflow-y-auto md:px-4 md:py-2 overflow-y-auto h-dvh">
        {children}
        <div className="h-36 md:h-[10px]"></div>
      </div>
    </div>
  );
}
