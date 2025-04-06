"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  GiftIcon, 
  HomeIcon,
  RefreshCwIcon,
  SettingsIcon,
  CheckIcon,
  FilterIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PersonPreferencesModal from "@/components/custom/Modals/Preferences";

export default function StartGiftingPage() {
  // Sample data - in a real app, this would come from your API
  const [people, setPeople] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      relationship: "Sister", 
      birthday: "Nov 15", 
      avatar: "/avatars/sarah.png",
      preferences: {
        interests: ["Reading", "Cooking", "Travel"],
        favoriteColors: ["Purple", "Teal"],
        giftCategories: ["Books", "Home Decor", "Experiences"],
        priceRange: { min: 30, max: 150 }
      }
    },
    { 
      id: 2, 
      name: "Emma Davis", 
      relationship: "Partner", 
      birthday: "Nov 22", 
      avatar: "/avatars/emma.png",
      preferences: {
        interests: ["Music", "Art", "Fashion"],
        favoriteColors: ["Black", "Red"],
        giftCategories: ["Jewelry", "Clothing", "Experiences"],
        priceRange: { min: 50, max: 200 }
      }
    },
    { 
      id: 3, 
      name: "Robert Johnson", 
      relationship: "Father", 
      birthday: "Dec 1", 
      avatar: "/avatars/dad.png",
      preferences: {
        interests: ["Sports", "Gardening", "Technology"],
        favoriteColors: ["Blue", "Green"],
        giftCategories: ["Electronics", "Sports & Outdoors", "Books"],
        priceRange: { min: 40, max: 180 }
      }
    },
    { 
      id: 4, 
      name: "Mary Johnson", 
      relationship: "Mother", 
      birthday: "Jan 12", 
      avatar: "/avatars/mom.png",
      preferences: {
        interests: ["Gardening", "Cooking", "Reading"],
        favoriteColors: ["Yellow", "Pink"],
        giftCategories: ["Home Decor", "Books", "Beauty & Wellness"],
        priceRange: { min: 25, max: 120 }
      }
    },
  ]);

  // Sample gift recommendations - in a real app, these would be fetched from an API
  const [giftRecommendations, setGiftRecommendations] = useState([]);
  
  // State for selected person and occasion
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState("Birthday");
  const [budget, setBudget] = useState([50, 150]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
  
  // State for modals and drawers
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [confirmPurchaseOpen, setConfirmPurchaseOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [purchaseSuccessOpen, setPurchaseSuccessOpen] = useState(false);
  
  // Sample gift data - in a real app, this would come from your API based on preferences
  const sampleGifts = [
    {
      id: 101,
      name: "Kindle Paperwhite",
      description: "The thinnest, lightest Kindle Paperwhite yet—with a flush-front design and 300 ppi glare-free display.",
      price: 139.99,
      image: "/gifts/kindle.jpg",
      category: "Electronics",
      rating: 4.8,
      matchScore: 95,
      matchReasons: ["Matches interest in Reading", "Within budget range", "Highly rated gift"],
      purchaseUrl: "https://amazon.com/kindle"
    },
    {
      id: 102,
      name: "Gourmet Cooking Class",
      description: "A hands-on cooking class with a professional chef to learn new recipes and techniques.",
      price: 89.99,
      image: "/gifts/cooking-class.jpg",
      category: "Experiences",
      rating: 4.7,
      matchScore: 92,
      matchReasons: ["Matches interest in Cooking", "Experience gift", "Within budget range"],
      purchaseUrl: "https://cookingclasses.com"
    },
    {
      id: 103,
      name: "Travel Journal Set",
      description: "Beautiful leather-bound travel journal with pen and accessories for documenting adventures.",
      price: 45.99,
      image: "/gifts/travel-journal.jpg",
      category: "Books",
      rating: 4.5,
      matchScore: 88,
      matchReasons: ["Matches interest in Travel", "Within budget range", "Practical gift"],
      purchaseUrl: "https://journals.com/travel"
    },
    {
      id: 104,
      name: "Ceramic Cookware Set",
      description: "Premium non-stick ceramic cookware set with 10 pieces in teal color.",
      price: 129.99,
      image: "/gifts/cookware.jpg",
      category: "Home Decor",
      rating: 4.6,
      matchScore: 85,
      matchReasons: ["Matches interest in Cooking", "Matches favorite color: Teal", "Within budget range"],
      purchaseUrl: "https://kitchenware.com/ceramic"
    },
    {
      id: 105,
      name: "World Literature Collection",
      description: "Collection of 5 award-winning novels from around the world, beautifully bound.",
      price: 79.99,
      image: "/gifts/books.jpg",
      category: "Books",
      rating: 4.4,
      matchScore: 82,
      matchReasons: ["Matches interest in Reading", "Within budget range", "Cultural value"],
      purchaseUrl: "https://books.com/collection"
    }
  ];
  
  // Occasions list
  const occasions = [
    "Birthday", "Anniversary", "Christmas", "Graduation", 
    "Wedding", "Housewarming", "Baby Shower", "Retirement",
    "Valentine's Day", "Mother's Day", "Father's Day", "Just Because"
  ];
  
  // Generate recommendations when a person is selected
  useEffect(() => {
    if (selectedPerson) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // In a real app, you would fetch recommendations from an API
        // based on selectedPerson, selectedOccasion, and budget
        setGiftRecommendations(sampleGifts);
        setCurrentGiftIndex(0);
        setIsLoading(false);
      }, 1500);
    } else {
      setGiftRecommendations([]);
    }
  }, [selectedPerson, selectedOccasion, budget]);
  
  const handlePersonSelect = (personId) => {
    const person = people.find(p => p.id === parseInt(personId));
    setSelectedPerson(person);
    
    // Reset other selections
    setCurrentGiftIndex(0);
    
    // Set budget based on person's preferences if available
    if (person?.preferences?.priceRange) {
      setBudget([person.preferences.priceRange.min, person.preferences.priceRange.max]);
    } else {
      setBudget([50, 150]);
    }
  };
  
  const handleNextGift = () => {
    if (currentGiftIndex < giftRecommendations.length - 1) {
      setCurrentGiftIndex(currentGiftIndex + 1);
    }
  };
  
  const handlePreviousGift = () => {
    if (currentGiftIndex > 0) {
      setCurrentGiftIndex(currentGiftIndex - 1);
    }
  };
  
  const handleSavePreferences = (preferencesData) => {
    // Update the preferences for the selected person
    setPeople(prevPeople => 
      prevPeople.map(person => 
        person.id === selectedPerson.id 
          ? { ...person, preferences: preferencesData } 
          : person
      )
    );
    
    // Update the selected person state
    setSelectedPerson(prev => ({
      ...prev,
      preferences: preferencesData
    }));
    
    setPreferencesModalOpen(false);
    
    // Refresh recommendations
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, you would fetch new recommendations
      setIsLoading(false);
    }, 1500);
  };
  
  const handlePurchase = () => {
    // In a real app, you would save this to your gift history database
    setConfirmPurchaseOpen(false);
    setPurchaseSuccessOpen(true);
  };
  
  const currentGift = giftRecommendations[currentGiftIndex];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Selection Panel */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Find the Perfect Gift</CardTitle>
                <CardDescription>
                  Select a person and occasion to get personalized gift recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Person Selection */}
                <div className="space-y-2">
                  <Label htmlFor="person">Who are you shopping for?</Label>
                  <Select 
                    value={selectedPerson?.id?.toString() || ""} 
                    onValueChange={handlePersonSelect}
                  >
                    <SelectTrigger id="person">
                      <SelectValue placeholder="Select a person" />
                    </SelectTrigger>
                    <SelectContent>
                      {people.map(person => (
                        <SelectItem key={person.id} value={person.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={person.avatar} alt={person.name} />
                              <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{person.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Occasion Selection */}
                <div className="space-y-2">
                  <Label htmlFor="occasion">What's the occasion?</Label>
                  <Select 
                    value={selectedOccasion} 
                    onValueChange={setSelectedOccasion}
                  >
                    <SelectTrigger id="occasion">
                      <SelectValue placeholder="Select an occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasions.map(occasion => (
                        <SelectItem key={occasion} value={occasion}>
                          {occasion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Budget Range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Budget Range</Label>
                    <span className="text-sm text-gray-500">
                      ${budget[0]} - ${budget[1]}
                    </span>
                  </div>
                  <Slider
                    value={budget}
                    min={10}
                    max={500}
                    step={10}
                    onValueChange={setBudget}
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={!selectedPerson}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setGiftRecommendations(sampleGifts);
                        setCurrentGiftIndex(0);
                        setIsLoading(false);
                      }, 1500);
                    }}
                  >
                    <GiftIcon className="mr-2 h-4 w-4" />
                    Find Gift Recommendations
                  </Button>
                  
                  {selectedPerson && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setPreferencesModalOpen(true)}
                    >
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Edit {selectedPerson.name}'s Preferences
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Person Info Card - Only show if a person is selected */}
            {selectedPerson && (
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedPerson.avatar} alt={selectedPerson.name} />
                      <AvatarFallback>{selectedPerson.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedPerson.name}</CardTitle>
                      <CardDescription>{selectedPerson.relationship}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Interests */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPerson.preferences?.interests?.map(interest => (
                          <Badge key={interest} variant="secondary">{interest}</Badge>
                        ))}
                        {(!selectedPerson.preferences?.interests || selectedPerson.preferences.interests.length === 0) && (
                          <span className="text-sm text-gray-400">No interests specified</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Gift Categories */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Preferred Gift Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPerson.preferences?.giftCategories?.map(category => (
                          <Badge key={category} variant="outline">{category}</Badge>
                        ))}
                        {(!selectedPerson.preferences?.giftCategories || selectedPerson.preferences.giftCategories.length === 0) && (
                          <span className="text-sm text-gray-400">No preferences specified</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Colors */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Favorite Colors</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPerson.preferences?.favoriteColors?.map(color => (
                          <div 
                            key={color} 
                            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100"
                          >
                            {color}
                          </div>
                        ))}
                        {(!selectedPerson.preferences?.favoriteColors || selectedPerson.preferences.favoriteColors.length === 0) && (
                          <span className="text-sm text-gray-400">No colors specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Right Column - Gift Recommendations */}
          <div className="w-full md:w-2/3">
            {!selectedPerson ? (
              <Card className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <GiftIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Start Finding Gifts</h3>
                  <p className="text-gray-500 mb-6">
                    Select a person from the left panel to see personalized gift recommendations.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/people">
                      Add People to Your Gift Circle
                    </Link>
                  </Button>
                </div>
              </Card>
            ) : isLoading ? (
              <Card className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <RefreshCwIcon className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Finding Perfect Gifts</h3>
                  <p className="text-gray-500">
                    Analyzing preferences and searching for the best gift ideas...
                  </p>
                </div>
              </Card>
            ) : giftRecommendations.length === 0 ? (
              <Card className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <GiftIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No Recommendations Found</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find gift recommendations matching your criteria. Try adjusting your preferences or budget.
                  </p>
                  <Button onClick={() => setPreferencesModalOpen(true)}>
                    Update Preferences
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Filters and Results Count */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Gift Recommendations 
                    <span className="text-gray-500 ml-2 text-sm font-normal">
                      ({giftRecommendations.length} results)
                    </span>
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => setFiltersOpen(true)}>
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
                
                {/* Current Gift Card */}
                {/* <Card className="overflow-hidden">
                  <div className="md:flex">
                    {/* Gift Image 
                    <div className="md:w-2/5 h-64 md:h-auto relative">
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <img 
                          src={currentGift.image || "/placeholder-gift.jpg"} 
                          alt={currentGift.name}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      
                      {/* Match Score Badge 
                      <div className="absolute top-4 left-4 bg-purple-600 text-white rounded-full px-3 py-1 text-sm font-medium flex items-center">
                        <StarIcon className="h-4 w-4 mr-1" />
                        {currentGift.matchScore}% Match
                      </div>
                    </div>
                    
                    {/* Gift Details 
                    <div className="md:w-3/5 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{currentGift.name}</h3>
                          <div className="flex items-center mb-4">
                            <Badge variant="outline">{currentGift.category}</Badge>
                            <div className="ml-4 flex items-center text-amber-500">
                              <StarIcon className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-sm">{currentGift.rating}</span>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">${currentGift.price}</span>
                          </div>
                        </div>
                        
                        {/* Navigation Buttons 
                        <div className="flex space-x-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            disabled={currentGiftIndex === 0}
                            onClick={handlePreviousGift}
                          >
                            <ArrowRightIcon className="h-4 w-4 rotate-180" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            disabled={currentGiftIndex === giftRecommendations.length - 1}
                            onClick={handleNextGift}
                          >
                            <ArrowRightIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">
                        {currentGift.description}
                      </p>
                      
                      {/* Why We Recommend 
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Why We Recommend This</h4>
                        <ul className="space-y-1">
                          {currentGift.matchReasons.map((reason, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Action Buttons 
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => setConfirmPurchaseOpen(true)}
                        >
                          <ShoppingCartIcon className="mr-2 h-4 w-4" />
                          Add to Gift History
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={currentGift.purchaseUrl} target="_blank" rel="noopener noreferrer">
                            View Online
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <HeartIcon className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card> */}
                
                {/* More Recommendations */}
                <div>
                  <h3 className="text-lg font-medium mb-4">More Recommendations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {giftRecommendations.map((gift, index) => (
                      index !== currentGiftIndex && (
                        <Card 
                          key={gift.id} 
                          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setCurrentGiftIndex(index)}
                        >
                          <div className="h-40 relative">
                            <img 
                              src={gift.image || "/placeholder-gift.jpg"} 
                              alt={gift.name}
                              className="object-cover h-full w-full"
                            />
                            <div className="absolute top-2 left-2 bg-purple-600 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                              {gift.matchScore}% Match
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-1 line-clamp-1">{gift.name}</h4>
                            <div className="flex justify-between items-center">
                              <Badge variant="outline" className="text-xs">{gift.category}</Badge>
                              <span className="text-sm font-medium">${gift.price}</span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Person Preferences Modal */}
      {selectedPerson && (
        <PersonPreferencesModal
          isOpen={preferencesModalOpen}
          onClose={() => setPreferencesModalOpen(false)}
          onSave={handleSavePreferences}
          person={selectedPerson}
          preferences={selectedPerson.preferences}
        />
      )}
      
      {/* Confirm Purchase Dialog */}
      {currentGift && (
        <Dialog open={confirmPurchaseOpen} onOpenChange={setConfirmPurchaseOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Gift History</DialogTitle>
              <DialogDescription>
                Record this gift in your history to remember what you've given to {selectedPerson?.name}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center gap-4 py-4">
              <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                <img 
                  src={currentGift.image || "/placeholder-gift.jpg"} 
                  alt={currentGift.name}
                  className="object-cover h-full w-full"
                />
              </div>
              <div>
                <h3 className="font-medium">{currentGift.name}</h3>
                <p className="text-sm text-gray-500">${currentGift.price} • {currentGift.category}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="purchase-date">When did you give this gift?</Label>
                <Input 
                  id="purchase-date" 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]} 
                />
              </div>
              
              <div>
                <Label htmlFor="purchase-notes">Notes (optional)</Label>
                <Input 
                  id="purchase-notes" 
                  placeholder="Add any notes about this gift..." 
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmPurchaseOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePurchase}>
                Save to Gift History
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Purchase Success Dialog */}
      <Dialog open={purchaseSuccessOpen} onOpenChange={setPurchaseSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gift Added to History</DialogTitle>
            <DialogDescription>
              The gift has been successfully added to your gift history.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setPurchaseSuccessOpen(false);
                // In a real app, you might want to refresh the recommendations
              }}
            >
              Find Another Gift
            </Button>
            <Button asChild>
              <Link href="/gift-history">
                View Gift History
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>
        </div>
  )}
