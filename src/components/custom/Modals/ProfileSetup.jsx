"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, UserIcon, UploadIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProfileSetupModal({ 
  isOpen, 
  onClose, 
  onSave, 
  userData = null, // User data if editing existing profile
  isFirstTimeSetup = false // Whether this is the first time setup
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    birthday: undefined,
    interests: [],
    favoriteColors: [],
    giftPreferences: [],
    bio: "",
    avatarUrl: ""
  });

  const interests = [
    "Reading", "Cooking", "Sports", "Music", "Art", "Technology", 
    "Travel", "Fashion", "Gaming", "Fitness", "Movies", "Gardening"
  ];

  const giftCategories = [
    "Electronics", "Books", "Clothing", "Home Decor", "Experiences", 
    "Food & Drink", "Beauty & Wellness", "Sports & Outdoors", "Handmade"
  ];

  const colors = [
    "Red", "Blue", "Green", "Purple", "Yellow", "Pink", 
    "Black", "White", "Orange", "Brown", "Gray", "Teal"
  ];

  // Initialize form with user data if available
  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        gender: userData.gender || "",
        birthday: userData.birthday ? new Date(userData.birthday) : undefined,
        interests: userData.interests || [],
        favoriteColors: userData.favoriteColors || [],
        giftPreferences: userData.giftPreferences || [],
        bio: userData.bio || "",
        avatarUrl: userData.avatarUrl || ""
      });
    } else {
      // Reset form for new setup
      setFormData({
        fullName: "",
        email: "",
        gender: "",
        birthday: undefined,
        interests: [],
        favoriteColors: [],
        giftPreferences: [],
        bio: "",
        avatarUrl: ""
      });
    }
  }, [userData, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => {
      const currentArray = [...prev[field]];
      const index = currentArray.indexOf(value);
      
      if (index === -1) {
        // Add the value
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        // Remove the value
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: userData?.id || Date.now() // Use existing ID or generate new one
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isFirstTimeSetup ? "Welcome to GiftWise!" : "Edit Your Profile"}
            </DialogTitle>
            <DialogDescription>
              {isFirstTimeSetup 
                ? "Let's set up your profile to help us find perfect gifts for your loved ones." 
                : "Update your profile information to improve gift recommendations."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatarUrl} alt={formData.fullName} />
                <AvatarFallback>
                  <UserIcon className="h-12 w-12 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" size="sm">
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
            </div>
            
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gender" className="text-right">
                    Gender
                  </Label>
                  <RadioGroup
                    id="gender"
                    value={formData.gender}
                    onValueChange={(value) => handleChange("gender", value)}
                    className="col-span-3 flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="birthday" className="text-right">
                    Birthday
                  </Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="birthday"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.birthday ? (
                            format(formData.birthday, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.birthday}
                          onSelect={(date) => handleChange("birthday", date)}
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromYear={1940}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interests */}
            <div>
              <h3 className="text-lg font-medium mb-4">Interests</h3>
              <p className="text-sm text-gray-500 mb-4">
                Select interests that describe you (helps us recommend gifts you'd like to give)
              </p>
              <div className="grid grid-cols-3 gap-2">
                {interests.map(interest => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`interest-${interest}`} 
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleArrayToggle("interests", interest);
                        } else {
                          handleArrayToggle("interests", interest);
                        }
                      }}
                    />
                    <Label htmlFor={`interest-${interest}`}>{interest}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gift Preferences */}
            <div>
              <h3 className="text-lg font-medium mb-4">Gift Preferences</h3>
              <p className="text-sm text-gray-500 mb-4">
                What types of gifts do you prefer to give to others?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {giftCategories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`gift-${category}`} 
                      checked={formData.giftPreferences.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleArrayToggle("giftPreferences", category);
                        } else {
                          handleArrayToggle("giftPreferences", category);
                        }
                      }}
                    />
                    <Label htmlFor={`gift-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Favorite Colors */}
            <div>
              <h3 className="text-lg font-medium mb-4">Favorite Colors</h3>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`color-${color}`} 
                      checked={formData.favoriteColors.includes(color)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleArrayToggle("favoriteColors", color);
                        } else {
                          handleArrayToggle("favoriteColors", color);
                        }
                      }}
                    />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bio */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="text-right pt-2">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="col-span-3"
                placeholder="Tell us a bit about yourself..."
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            {!isFirstTimeSetup && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isFirstTimeSetup ? "Complete Setup" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
