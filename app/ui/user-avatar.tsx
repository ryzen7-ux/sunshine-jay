"use client";

import { User } from "@heroui/react";
import { UserTypes } from "@/app/lib/definitions";

export default function UserAvatar({ user }: { user: UserTypes }) {
  return (
    <>
      <User description={`${user?.email} | ${user?.role}`} name={user?.name} />
    </>
  );
}
