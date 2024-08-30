"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { TiWeatherSunny } from "react-icons/ti";
import { GoMoon } from "react-icons/go";
import { useTheme } from "next-themes";

function UserButton({ user }) {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu className="" modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="border border-primary text-base bg-primary hover:bg-primary/90 "
          variant="outline">
          <FaRegCircleUser className="text-xl text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 space-y-3 font-semibold ">
        <DropdownMenuLabel className="bg-primary p-1 rounded-sm text-gray-100 py-4 text-center">
          {user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-4">
          <span>سفارشات</span>
          <DropdownMenuShortcut>
            <FiShoppingBag className="text-base" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="py-4">
          <span>تنظیمات</span>
          <DropdownMenuShortcut>
            <IoSettingsOutline className="text-base" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="py-4">
          <span>Theme</span>
          <DropdownMenuShortcut className="flex items-center justify-center gap-x-4">
            <button onClick={() => setTheme("light")}>
              <TiWeatherSunny className="text-lg hover:-translate-y-1 transition-all duration-100" />
            </button>
            <button onClick={() => setTheme("dark")}>
              <GoMoon className="text-lg hover:-translate-y-1 transition-all duration-100" />
            </button>
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className=" hover:bg-primary hover:text-gray-200 border py-4 ">
          <button className="font-bold text-base " onClick={() => signOut()}>
            خروج
          </button>
          <DropdownMenuShortcut>
            <TbLogout className="text-base" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
