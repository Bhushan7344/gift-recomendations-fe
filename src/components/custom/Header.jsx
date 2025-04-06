"use client";
import Link from "next/link";
import { GiftIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import UserDetailsModal from "./Modals/UserDetails";
import { useState } from "react";

const Header = () => {
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <GiftIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">GiftWise</h1>
          </div>
        </Link>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => setUserDetailsOpen(true)}
        >
          <Avatar>
            <AvatarImage src="/avatars/user.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <UserDetailsModal
        isOpen={userDetailsOpen}
        onClose={() => setUserDetailsOpen(false)}
      />
    </header>
  );
};

export default Header;
