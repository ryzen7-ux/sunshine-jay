"use client";
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  useDisclosure,
} from "@heroui/react";
import { Link, LockIcon, MailIcon, Menu, PowerIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import NavLinks from "./nav-links";
import { signOutUser } from "@/app/lib/actions";

export function SidebarCollapsible({ user }: { user: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["opaque", "blur", "transparent"];

  const handleBackdropChange = (backdrop: any) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const hanldeSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signOutUser();
  };

  return (
    <>
      <div className="pl-4 pr-2 py-4">
        <button onClick={() => handleBackdropChange(backdrop)}>
          <Menu className="h-7 w-7" />
        </button>
      </div>
      <Drawer
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="left"
        size="xs"
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
            },
            exit: {
              x: 100,
              opacity: 0,
            },
          },
        }}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 bg-gray-200">
                <Image
                  src="/logo.png"
                  width={400}
                  height={150}
                  alt="Screenshots of the dashboard project showing desktop version"
                />
              </DrawerHeader>
              <DrawerBody>
                <NavLinks onClose={onClose} />
              </DrawerBody>
              <DrawerFooter className="w-full">
                {/* <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button> */}
                <form onSubmit={hanldeSignOut} className="w-full">
                  <Button
                    type="submit"
                    color="danger"
                    startContent={<PowerIcon className="h-5 w-5" />}
                    className="w-full">
                    Sign Out
                  </Button>
                </form>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
