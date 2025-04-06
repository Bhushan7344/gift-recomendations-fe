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
    favoriteColors: [],
    clothingSizes: {
      shirt: "",
      pants: "",
      shoes: "",
    },
    giftCategories: [],
    priceRange: {
      min: 20,
      max: 100,
    },
    dislikes: [],
    wishlistItems: [],
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

  const giftCategories = [
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

  const colors = [
    "Red",
    "Blue",
    "Green",
    "Purple",
    "Yellow",
    "Pink",
    "Black",
    "White",
    "Orange",
    "Brown",
    "Gray",
    "Teal",
  ];

  // Initialize form with existing preferences if available
  useEffect(() => {
    if (preferences) {
      setFormData({
        interests: preferences.interests || [],
        favoriteColors: preferences.favoriteColors || [],
        clothingSizes: preferences.clothingSizes || {
          shirt: "",
          pants: "",
          shoes: "",
        },
        giftCategories: preferences.giftCategories || [],
        priceRange: preferences.priceRange || {
          min: 20,
          max: 100,
        },
        dislikes: preferences.dislikes || [],
        wishlistItems: preferences.wishlistItems || [],
        notes: preferences.notes || "",
      });
    } else {
      // Reset form for new preferences
      setFormData({
        interests: [],
        favoriteColors: [],
        clothingSizes: {
          shirt: "",
          pants: "",
          shoes: "",
        },
        giftCategories: [],
        priceRange: {
          min: 20,
          max: 100,
        },
        dislikes: [],
        wishlistItems: [],
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

  const addWishlistItem = () => {
    const newItem = { id: Date.now(), name: "", url: "", price: "" };
    setFormData((prev) => ({
      ...prev,
      wishlistItems: [...prev.wishlistItems, newItem],
    }));
  };

  const updateWishlistItem = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      wishlistItems: prev.wishlistItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeWishlistItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      wishlistItems: prev.wishlistItems.filter((item) => item.id !== id),
    }));
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
    onSave({
      personId: person.id,
      ...formData,
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
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="interests">Interests</TabsTrigger>
              <TabsTrigger value="gifts">Gift Types</TabsTrigger>
              <TabsTrigger value="sizes">Sizes</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>

            {/* Interests Tab */}
            <TabsContent value="interests" className="pt-4">
              <div className="space-y-6">
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

                <div>
                  <h3 className="text-lg font-medium mb-4">Favorite Colors</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
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
                    {giftCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`gift-${category}`}
                          checked={formData.giftCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleArrayToggle("giftCategories", category);
                            } else {
                              handleArrayToggle("giftCategories", category);
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
                          <span className="text-gray-500 mr-1">$</span>
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
                          <span className="text-gray-500 mr-1">$</span>
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

            {/* Sizes Tab */}
            <TabsContent value="sizes" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Clothing Sizes</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Add clothing sizes for {person?.name} (optional)
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="shirtSize" className="text-right">
                        Shirt Size
                      </Label>
                      <Select
                        value={formData.clothingSizes.shirt}
                        onValueChange={(value) =>
                          handleNestedChange("clothingSizes", "shirt", value)
                        }
                      >
                        <SelectTrigger id="shirtSize" className="col-span-3">
                          <SelectValue placeholder="Select shirt size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NA">Not specified</SelectItem>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="pantsSize" className="text-right">
                        Pants Size
                      </Label>
                      <Input
                        id="pantsSize"
                        value={formData.clothingSizes.pants}
                        onChange={(e) =>
                          handleNestedChange(
                            "clothingSizes",
                            "pants",
                            e.target.value
                          )
                        }
                        className="col-span-3"
                        placeholder="e.g., 32x30, 10, Medium"
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="shoeSize" className="text-right">
                        Shoe Size
                      </Label>
                      <Input
                        id="shoeSize"
                        value={formData.clothingSizes.shoes}
                        onChange={(e) =>
                          handleNestedChange(
                            "clothingSizes",
                            "shoes",
                            e.target.value
                          )
                        }
                        className="col-span-3"
                        placeholder="e.g., 9, 42, 7.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="pt-4">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Wishlist Items</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addWishlistItem}
                    >
                      Add Item
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Add specific items that {person?.name} has mentioned wanting
                  </p>

                  {formData.wishlistItems.length === 0 ? (
                    <div className="text-center py-8 border border-dashed rounded-md">
                      <p className="text-gray-500">
                        No wishlist items added yet
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        onClick={addWishlistItem}
                        className="mt-2"
                      >
                        Add your first item
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-md p-4 space-y-3"
                        >
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`item-name-${item.id}`}
                              className="text-right"
                            >
                              Item Name
                            </Label>
                            <Input
                              id={`item-name-${item.id}`}
                              value={item.name}
                              onChange={(e) =>
                                updateWishlistItem(
                                  item.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="col-span-3"
                              placeholder="e.g., Wireless Headphones"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`item-url-${item.id}`}
                              className="text-right"
                            >
                              URL (optional)
                            </Label>
                            <Input
                              id={`item-url-${item.id}`}
                              value={item.url}
                              onChange={(e) =>
                                updateWishlistItem(
                                  item.id,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="col-span-3"
                              placeholder="Link to the product"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`item-price-${item.id}`}
                              className="text-right"
                            >
                              Price (optional)
                            </Label>
                            <div className="col-span-2 flex items-center">
                              <span className="text-gray-500 mr-1">$</span>
                              <Input
                                id={`item-price-${item.id}`}
                                value={item.price}
                                onChange={(e) =>
                                  updateWishlistItem(
                                    item.id,
                                    "price",
                                    e.target.value
                                  )
                                }
                                placeholder="Approximate price"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeWishlistItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
