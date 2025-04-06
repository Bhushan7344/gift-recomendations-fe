"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
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
  PersonStandingIcon
} from "lucide-react";
import ProfileSetupModal from "@/components/custom/Modals/ProfileSetup";

export default function UserDetailsModal({ 
  isOpen, 
  onClose, 
  userData 
}) {
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  
  const handleEditProfile = () => {
    setProfileEditOpen(true);
  };
  
  const handleSaveProfile = (updatedUserData) => {
    // In a real app, you would save this data to your backend
    console.log("Updated user data:", updatedUserData);
    
    // Close the edit modal
    setProfileEditOpen(false);
    
    // You might want to refresh the user data or close both modals
    // For this example, we'll just close the edit modal
  };
  
  // Format birthday for display
  const formattedBirthday = userData?.birthday 
    ? new Date(userData.birthday).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
    : 'Not specified';
  
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
              <AvatarImage src={userData?.avatarUrl} alt={userData?.fullName} />
              <AvatarFallback className="text-2xl">
                {userData?.fullName?.charAt(0) || <PersonIcon className="h-12 w-12" />}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{userData?.fullName}</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 items-center sm:items-start">
                <div className="flex items-center text-gray-500">
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="text-sm">{userData?.email}</span>
                </div>
                {userData?.gender && (
                  <div className="flex items-center text-gray-500">
                    <PersonStandingIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm capitalize">{userData?.gender}</span>
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
                userData.interests.map(interest => (
                  <Badge key={interest} variant="secondary">{interest}</Badge>
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
              {userData?.giftPreferences && userData.giftPreferences.length > 0 ? (
                userData.giftPreferences.map(preference => (
                  <Badge key={preference} variant="outline">{preference}</Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">No gift preferences specified</p>
              )}
            </div>
          </div>
          
          {/* Favorite Colors Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PaletteIcon className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-medium">Favorite Colors</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {userData?.favoriteColors && userData.favoriteColors.length > 0 ? (
                userData.favoriteColors.map(color => (
                  <div 
                    key={color} 
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100"
                  >
                    {color}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No favorite colors specified</p>
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
