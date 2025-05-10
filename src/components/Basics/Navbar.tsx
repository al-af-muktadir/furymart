"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { LoaderIcon, LogOut, Menu, PlusCircle, X } from "lucide-react";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/UserContext";
import { logOut } from "@/services/AuthServices";
import { protectedRoutes } from "@/constants";

const Navbar = () => {
  const { user, isLoading, setIsLoading } = useUser();
  console.log(user);
  const navLinks = [{ name: "Home", path: "/" }];
  const pathname = usePathname();
  const router = useRouter();
  const handleLogOut = () => {
    logOut();
    setIsLoading(true);
    protectedRoutes.some((route) => pathname.match(route));
    router.push("/");
  };
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-3">
      <div className="container mx-auto h-16 px-5 md:px-10">
        <div className="relative h-16 md:h-20">
          {/* <!-- Menu & Small Device for Small Device--> */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <Drawer>
              {/* <!-- Menu for Small Device--> */}
              <DrawerTrigger asChild>
                <Button
                  variant="default"
                  className="bg-transparent text-black dark:text-rose-500"
                >
                  <Menu />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="text-black dark:text-rose-500">
                <div className="mx-auto w-full">
                  <DrawerHeader>
                    <DrawerTitle className="sr-only">Menu</DrawerTitle>
                    <DrawerDescription className="sr-only">
                      Nav Items.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex justify-end items-start mr-2">
                    <DrawerClose asChild>
                      <Button variant="outline">
                        <X />
                      </Button>
                    </DrawerClose>
                  </div>

                  <div className="p-4">
                    {/* NavItems for Small Device */}
                    <div className="pb-3 flex flex-col justify-center items-end gap-2">
                      {navLinks.map(({ name, path }) => (
                        <Link
                          key={name}
                          href={path}
                          className={
                            pathname === path
                              ? "rounded-md border border-black text-rose-500 dark:text-white  dark:border-rose-500 px-3 py-2 text-sm font-medium"
                              : "rounded-md border border-transparent px-3 py-2 text-sm font-medium hover:bg-rose-500 hover:text-black"
                          }
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* logo, NavItems, Profile dropdown for Large Device */}
          <div className="flex justify-between items-center h-full">
            {/* logo for all */}
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                className="hidden md:flex text-2xl font-black items-center"
              >
                <div>
                  <p className="font-bold">
                    Fury Mart <span className="font-bold text-rose-500">.</span>
                  </p>
                </div>
              </Link>
            </div>
            {/* NavItems for Large Device */}
            <div className="hidden md:block text-black dark:text-rose-500">
              <div className="flex space-x-2 md:space-x-5">
                {navLinks.map(({ name, path }) => (
                  <div className="relative group" key={name}>
                    <Link
                      key={name}
                      href={path}
                      className={
                        pathname === path
                          ? "border-b-2 border-rose-300 dark:text-white"
                          : "border-b-0  dark:text-white hover:text-rose-700 dark:hover:text-rose-300"
                      }
                    >
                      {name}
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-rose-300 transition-all duration-300 group-hover:w-full"></span>
                  </div>
                ))}
              </div>
            </div>
            {/* <!-- Profile dropdown for Large Device --> */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-6">
              <div className="flex gap-10">
                {isLoading ? (
                  <LoaderIcon />
                ) : user ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar>
                          <AvatarImage alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <Link href="/profile">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                          </Link>
                          {/* <Link href={`/${user.role.toLowerCase()}/dashboard`}> */}
                          <DropdownMenuItem>Dashboard</DropdownMenuItem>
                          {/* </Link> */}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={handleLogOut}
                          className="text-red-600 font-semibold cursor-pointer"
                        >
                          Log out <LogOut className="text-red-600" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/create-shop">
                      <Button className="bg-rose-500 font-bold rounded-3xl flex items-center">
                        Create Shop <PlusCircle></PlusCircle>
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/login">
                    <Button className="bg-rose-500 font-bold rounded-lg px-4 py-2">
                      Log In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
