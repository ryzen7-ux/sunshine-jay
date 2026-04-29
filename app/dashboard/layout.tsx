import UserAvatar from "@/app/ui/user-avatar";
import { cookies } from "next/headers";
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
    <main className="h-screen">
      <div className="flex justify-between bg-blue-100 pr-4 fixed left-0 top-0 z-50 w-full">
        <div className="flex ">
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
      <div className=" p-2 md:px-4 md:py-2 h-full overflow-y-auto ">
        {children}
      </div>
    </main>
  );
}
