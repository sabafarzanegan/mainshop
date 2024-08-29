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

function UserButton({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border border-purple-600 text-base "
          variant="outline">
          کاربر
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
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
