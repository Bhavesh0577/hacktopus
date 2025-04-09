"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { User, LogOut, CalendarDays, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-zinc-900/70 transition-colors"
          >
            <Avatar className="h-8 w-8 border-2 border-purple-500/30">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-64 py-3 px-1 font-medium bg-zinc-900/95 backdrop-blur-md border border-zinc-800/80 text-white rounded-xl shadow-xl"
        >
          <div className="px-3 pb-3">
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-12 w-12 border-2 border-purple-500/30">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-lg">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold text-white">{user?.fullName || "Guest"}</p>
                <p className="text-zinc-400 text-sm">{user?.emailAddresses?.[0]?.emailAddress || "No Email"}</p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="bg-zinc-800 my-1" />

          <div className="px-1">
            <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-3 rounded-lg cursor-pointer focus:bg-white/10 hover:bg-white/10 focus:text-white">
              <Link href="/profile" className="w-full flex items-center gap-2">
                <User className="h-4 w-4 text-purple-400" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-3 rounded-lg cursor-pointer focus:bg-white/10 hover:bg-white/10 focus:text-white">
              <Link href="/my-events" className="w-full flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-pink-400" />
                <span>My Events</span>
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="bg-zinc-800 my-1" />

          <div className="px-1">
            <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-3 rounded-lg cursor-pointer focus:bg-white/10 hover:bg-white/10 focus:text-white text-red-400 hover:text-red-300">
              <button onClick={handleSignOut} className="w-full flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;