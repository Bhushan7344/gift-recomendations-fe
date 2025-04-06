"use client";
import Link from "next/link";

import { GiftIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import UserDetailsModal from "./Modals/UserDetails";
import { useState } from "react";

const Header = () => {
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);

  const [userData, setUserData] = useState({
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    gender: "male",
    birthday: new Date("1990-05-15"),
    avatarUrl: "/avatars/john.png",
    interests: ["Reading", "Technology", "Travel", "Photography"],
    favoriteColors: ["Blue", "Green", "Black"],
    giftPreferences: [
      "Electronics",
      "Books",
      "Experiences",
      "Subscription Boxes",
    ],
    bio: "I'm a tech enthusiast who loves finding the perfect gifts for friends and family. When I'm not browsing the latest gadgets, you can find me reading or planning my next adventure.",
  });
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
        userData={userData}
      />
    </header>
  );
};

export default Header;
