"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  PersonIcon,
  PencilIcon,
  GiftIcon,
  HeartIcon,
  PaletteIcon,
  Mail,
  PersonStandingIcon,
} from "lucide-react";
import ProfileSetupModal from "@/components/custom/Modals/ProfileSetup";
import { getUserById, updateUserPreferences } from "@/lib/api/users";

export default function UserDetailsModal({ isOpen, onClose}) {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
      async function fetchPosts() {
        try {
          setLoading(true);
          const response = await getUserById('00f70814-88b5-417e-8c27-26f221313902');        
          setUserData(response.data);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchPosts();
    }, []);
  const [profileEditOpen, setProfileEditOpen] = useState(false);

  const handleEditProfile = () => {
    setProfileEditOpen(true);
  };

  const handleSaveProfile = async(updatedUserData) => {
    console.log("Updated user data:", updatedUserData);
    try {
      setLoading(true);
      const response = await updateUserPreferences('00f70814-88b5-417e-8c27-26f221313902', updatedUserData);        
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
      setProfileEditOpen(false);
    }
  };

  // Format birthday for display
  const formattedBirthday = userData?.birthday
    ? new Date(userData.birthday).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Profile</DialogTitle>
            <DialogDescription>
              View and manage your personal information and preferences
            </DialogDescription>
          </DialogHeader>

          {/* User Avatar and Basic Info */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 py-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={userData?.avatar_url}
                alt={userData?.full_name}
              />
              <AvatarFallback className="text-2xl">
                {userData?.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{userData?.full_name}</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 items-center sm:items-start">
                <div className="flex items-center text-gray-500">
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="text-sm">{userData?.email}</span>
                </div>
                {userData?.gender && (
                  <div className="flex items-center text-gray-500">
                    <PersonStandingIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm capitalize">
                      {userData?.gender}
                    </span>
                  </div>
                )}
                {userData?.birthday && (
                  <div className="flex items-center text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{formattedBirthday}</span>
                  </div>
                )}
              </div>

              {userData?.bio && (
                <p className="mt-4 text-gray-600">{userData.bio}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Interests Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HeartIcon className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-medium">Interests</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {userData?.interests && userData.interests.length > 0 ? (
                userData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">No interests specified</p>
              )}
            </div>
          </div>

          {/* Gift Preferences Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GiftIcon className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-medium">Gift Preferences</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {userData?.gift_preferences &&
              userData.gift_preferences.length > 0 ? (
                userData.gift_preferences.map((preference) => (
                  <Badge key={preference} variant="outline">
                    {preference}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No gift preferences specified
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleEditProfile}>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Edit Modal */}
      {profileEditOpen && (
        <ProfileSetupModal
          isOpen={profileEditOpen}
          onClose={() => setProfileEditOpen(false)}
          onSave={handleSaveProfile}
          userData={userData}
          isFirstTimeSetup={false}
        />
      )}
    </>
  );
}
