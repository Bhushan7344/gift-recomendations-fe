"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PersonPreferencesModal({
  isOpen,
  onClose,
  onSave,
  person, // The person whose preferences we're editing
  preferences = null, // Existing preferences if editing
}) {
  const [formData, setFormData] = useState({
    interests: [],
    age: "",
    gender: "",
    favorite_categories: [],
    priceRange: {
      min: 20,
      max: 100,
    },
    dislikes: [],
    notes: "",
  });

  const interests = [
    "Reading",
    "Cooking",
    "Sports",
    "Music",
    "Art",
    "Technology",
    "Travel",
    "Fashion",
    "Gaming",
    "Fitness",
    "Movies",
    "Gardening",
    "Photography",
    "Writing",
    "Dancing",
    "Hiking",
    "Crafts",
    "Collecting",
  ];

  const favorite_categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Home Decor",
    "Experiences",
    "Food & Drink",
    "Beauty & Wellness",
    "Sports & Outdoors",
    "Handmade",
    "Jewelry",
    "Gift Cards",
    "Subscription Boxes",
    "Personalized Items",
  ];

  useEffect(() => {
    if (preferences) {
      setFormData({
        interests: preferences.interests || [],
        age: preferences.age,
        gender: preferences.gender,
        favorite_categories: preferences.favorite_categories || [],
        priceRange: preferences.priceRange || {
          min: 20,
          max: 100,
        },
        dislikes: preferences.dislikes || [],
        notes: preferences.notes || "",
      });
    } else {
      setFormData({
        interests: [],
        age: "",
        gender: "",
        favorite_categories: [],
        priceRange: {
          min: 20,
          max: 100,
        },
        dislikes: [],
        notes: "",
      });
    }
  }, [preferences, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData((prev) => {
      const currentArray = [...prev[field]];
      const index = currentArray.indexOf(value);

      if (index === -1) {
        // Add the value
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        // Remove the value
        return {
          ...prev,
          [field]: currentArray.filter((item) => item !== value),
        };
      }
    });
  };

  const addDislike = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      handleArrayToggle("dislikes", e.target.value.trim());
      e.target.value = "";
      e.preventDefault();
    }
  };

  const removeDislike = (dislike) => {
    handleArrayToggle("dislikes", dislike);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { priceRange, ...restFormData } = formData;
    const formattedPriceRange = `${formData.priceRange.min}-${formData.priceRange.max} INR`;
    onSave({
      relationship_id: person.id,
      ...restFormData,
      price_range: formattedPriceRange,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={person?.avatar} alt={person?.name} />
                <AvatarFallback>
                  {person?.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
              <DialogTitle>Gift Preferences for {person?.name}</DialogTitle>
            </div>
            <DialogDescription>
              Add preferences to help find the perfect gifts for {person?.name}.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="interests" className="mt-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="interests">Interests</TabsTrigger>
              <TabsTrigger value="gifts">Gift Types</TabsTrigger>
            </TabsList>

            {/* Interests Tab */}
            <TabsContent value="interests" className="pt-4">
              <div className="space-y-6">
                {/* Interests & Hobbies */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Interests & Hobbies
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    What does {person?.name} enjoy doing?
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {interests.map((interest) => (
                      <div
                        key={interest}
                        className="flex items-center space-x-2"
                      >
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
                        <Label htmlFor={`interest-${interest}`}>
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Age Input */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Age</h3>
                  <Input
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        age: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                {/* Gender Input */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Gender</h3>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, gender: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Things They Dislike */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Things They Dislike
                  </h3>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.dislikes.map((dislike) => (
                        <div
                          key={dislike}
                          className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          <span>{dislike}</span>
                          <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => removeDislike(dislike)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <Input
                      placeholder="Type a dislike and press Enter..."
                      onKeyDown={addDislike}
                    />
                    <p className="text-xs text-gray-500">
                      Press Enter to add each item
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Gift Types Tab */}
            <TabsContent value="gifts" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Preferred Gift Categories
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    What types of gifts would {person?.name} appreciate?
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {favorite_categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`gift-${category}`}
                          checked={formData.favorite_categories.includes(
                            category
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleArrayToggle(
                                "favorite_categories",
                                category
                              );
                            } else {
                              handleArrayToggle(
                                "favorite_categories",
                                category
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`gift-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    What's an appropriate gift budget for {person?.name}?
                  </p>
                  <div className="space-y-6">
                    <Slider
                      value={[formData.priceRange.min, formData.priceRange.max]}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={(value) => {
                        handleNestedChange("priceRange", "min", value[0]);
                        handleNestedChange("priceRange", "max", value[1]);
                      }}
                      className="mb-6"
                    />
                    <div className="flex justify-between">
                      <div>
                        <Label htmlFor="minPrice">Min Price</Label>
                        <div className="flex items-center mt-1">
                          <span className="text-gray-500 mr-1">INR</span>
                          <Input
                            id="minPrice"
                            type="number"
                            value={formData.priceRange.min}
                            onChange={(e) =>
                              handleNestedChange(
                                "priceRange",
                                "min",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-24"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="maxPrice">Max Price</Label>
                        <div className="flex items-center mt-1">
                          <span className="text-gray-500 mr-1">INR</span>
                          <Input
                            id="maxPrice"
                            type="number"
                            value={formData.priceRange.max}
                            onChange={(e) =>
                              handleNestedChange(
                                "priceRange",
                                "max",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-24"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    placeholder={`Any additional information about ${person?.name}'s gift preferences...`}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Save Preferences
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
