"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { AcmeLogo } from "../navbar";
import { Link } from "lucide-react";
import { Button } from "../button";

export default function TopNavBar() {
  return (
    <Navbar position="static" className="fixed left-0 top-0">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button color="primary">Sign Up</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
