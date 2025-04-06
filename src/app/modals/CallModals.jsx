"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddEditPersonModal from "@/components/custom/Modals/PersonModal";
import ProfileSetupModal from "@/components/custom/Modals/ProfileSetup";
import PersonPreferencesModal from "@/components/custom/Modals/Preferences";
import DeletePersonModal from "@/components/custom/Modals/DeletePerson";
import UserDetailsModal from "@/components/custom/Modals/UserDetails";

export default function ModalsTestPage() {
  // Sample data
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    gender: "male",
    birthday: new Date("1990-05-15"),
    interests: ["Reading", "Technology", "Travel"],
    favoriteColors: ["Blue", "Green"],
    giftPreferences: ["Electronics", "Books"],
    bio: "I love finding the perfect gifts for my friends and family.",
  });

  const [samplePerson, setSamplePerson] = useState({
    id: 101,
    name: "Sarah Johnson",
    relationship: "Sister",
    email: "sarah@example.com",
    phone: "555-123-4567",
    birthday: new Date("1992-11-15"),
    anniversary: null,
    notes: "Always appreciates thoughtful gifts.",
    avatar: "/avatars/sarah.png",
  });

  const [samplePreferences, setSamplePreferences] = useState({
    interests: ["Reading", "Cooking", "Travel"],
    favoriteColors: ["Purple", "Teal"],
    clothingSizes: {
      shirt: "M",
      pants: "8",
      shoes: "7.5",
    },
    giftCategories: ["Books", "Home Decor", "Experiences"],
    priceRange: {
      min: 30,
      max: 150,
    },
    dislikes: ["Loud toys", "Scented candles"],
    wishlistItems: [
      {
        id: 1,
        name: "Kindle Paperwhite",
        url: "https://amazon.com/kindle",
        price: "139.99",
      },
      { id: 2, name: "Cooking Class", url: "", price: "75" },
    ],
    notes: "Prefers experiences over physical items when possible.",
  });

  // Modal states
  const [addEditPersonModalOpen, setAddEditPersonModalOpen] = useState(false);
  const [profileSetupModalOpen, setProfileSetupModalOpen] = useState(false);
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Modal handlers
  const handleSavePerson = (personData) => {
    console.log("Person saved:", personData);
    // In a real app, you would update your state or database here
    if (isEditMode) {
      setSamplePerson(personData);
    }
    setAddEditPersonModalOpen(false);
  };

  const handleSaveProfile = (profileData) => {
    console.log("Profile saved:", profileData);
    setCurrentUser(profileData);
    setProfileSetupModalOpen(false);
  };

  const handleSavePreferences = (preferencesData) => {
    console.log("Preferences saved:", preferencesData);
    setSamplePreferences(preferencesData);
    setPreferencesModalOpen(false);
  };

  const handleDeletePerson = (personId) => {
    console.log("Person deleted:", personId);
    // In a real app, you would remove the person from your state or database
    setDeleteModalOpen(false);
  };

  const [userDetailsOpen, setUserDetailsOpen] = useState(false);

  // Sample user data - in a real app, this would come from your API or state management
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

  // This function would be called when the profile is updated
  const handleProfileUpdate = (updatedData) => {
    setUserData(updatedData);
    // You might want to save this to your backend as well
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Modal Components Test Page</h1>
      <p className="text-gray-600">
        This page demonstrates how to use the modal components for the GiftWise
        application.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add/Edit Person Modal Card */}
        <Card>
          <CardHeader>
            <CardTitle>Add/Edit Person Modal</CardTitle>
            <CardDescription>
              Use this modal to add a new person or edit an existing person's
              details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => {
                setIsEditMode(false);
                setAddEditPersonModalOpen(true);
              }}
            >
              Add New Person
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditMode(true);
                setAddEditPersonModalOpen(true);
              }}
            >
              Edit Existing Person
            </Button>

            {/* The Modal */}
            <AddEditPersonModal
              isOpen={addEditPersonModalOpen}
              onClose={() => setAddEditPersonModalOpen(false)}
              onSave={handleSavePerson}
              person={isEditMode ? samplePerson : null}
            />
          </CardContent>
        </Card>

        {/* Profile Setup Modal Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Setup Modal</CardTitle>
            <CardDescription>
              Use this modal for initial profile setup or to edit user profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => {
                setProfileSetupModalOpen(true);
              }}
            >
              Edit Your Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentUser(null); // Reset to simulate new user
                setProfileSetupModalOpen(true);
              }}
            >
              Simulate First-Time Setup
            </Button>

            {/* The Modal */}
            <ProfileSetupModal
              isOpen={profileSetupModalOpen}
              onClose={() => setProfileSetupModalOpen(false)}
              onSave={handleSaveProfile}
              userData={currentUser}
              isFirstTimeSetup={!currentUser}
            />
          </CardContent>
        </Card>

        {/* Person Preferences Modal Card */}
        <Card>
          <CardHeader>
            <CardTitle>Person Preferences Modal</CardTitle>
            <CardDescription>
              Use this modal to set or edit gift preferences for a person.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => {
                setPreferencesModalOpen(true);
              }}
            >
              Edit Person Preferences
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSamplePreferences(null); // Reset to simulate new preferences
                setPreferencesModalOpen(true);
              }}
            >
              Add New Preferences
            </Button>

            {/* The Modal */}
            <PersonPreferencesModal
              isOpen={preferencesModalOpen}
              onClose={() => setPreferencesModalOpen(false)}
              onSave={handleSavePreferences}
              person={samplePerson}
              preferences={samplePreferences}
            />
          </CardContent>
        </Card>

        {/* Delete Person Modal Card */}
        <Card>
          <CardHeader>
            <CardTitle>Delete Person Modal</CardTitle>
            <CardDescription>
              Use this modal to confirm deletion of a person.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={() => {
                setDeleteModalOpen(true);
              }}
            >
              Delete Person
            </Button>

            {/* The Modal */}
            <DeletePersonModal
              isOpen={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onDelete={handleDeletePerson}
              person={samplePerson}
            />
          </CardContent>
        </Card>
      </div>

      {/* Current State Display */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Current State</CardTitle>
          <CardDescription>
            This shows the current state that would be updated by the modals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Current User:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs">
                {JSON.stringify(currentUser, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-2">Sample Person:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs">
                {JSON.stringify(samplePerson, null, 2)}
              </pre>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-medium mb-2">Person Preferences:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs">
                {JSON.stringify(samplePreferences, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              View and manage your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => setUserDetailsOpen(true)}>
              View Profile Details
            </Button>
          </CardContent>
        </Card>

        {/* User Details Modal */}
        <UserDetailsModal
          isOpen={userDetailsOpen}
          onClose={() => setUserDetailsOpen(false)}
          userData={userData}
        />
      </div>
    </div>
  );
}
