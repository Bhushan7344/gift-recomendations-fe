"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GiftIcon,
  HomeIcon,
  RefreshCwIcon,
  SettingsIcon,
  CheckIcon,
  FilterIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { getAllRelationships } from "@/lib/api/relationship";
import { getRelationshipPreferences } from "@/lib/api/relate-preferences";

export default function StartGiftingPage() {
  const [people, setPeople] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);

  const userId = "00f70814-88b5-417e-8c27-26f221313902"; // Current user ID

  async function fetchRelationships() {
    try {
      const response = await getAllRelationships(userId);
      if (response.status === "success" && response.data) {
        // Transform data to match the component's expected format
        const formattedPeople = response.data.map((person) => ({
          id: person.id,
          name: person.name,
          relationship: person.relationship_type,
          avatar: person.avatar,
          email: person.email,
          phone: person.phone_number,
          birthdate: person.birthdate,
          anniversary: person.anniversary,
          notes: person.notes,
        }));
        setPeople(formattedPeople);
      }
    } catch (error) {
      console.error("Failed to fetch relationships:", error);
    }
  }

  async function fetchPreferences() {
    const relationshipId = "ff3fa1e5-a25d-413e-98f5-87249a7f6f3c";
    setIsLoadingPreferences(true);
    try {
      const response = await getRelationshipPreferences(relationshipId);

      if (response.data) {
        const formattedPreferences = {
          interests: response.data.interests || [],
          favorite_categories: response.data.favorite_categories || [],
          priceRange: response.data.priceRange,
          dislikes: response.data.dislikes || [],
          notes: response.data.notes,
          age: response.data.age,
          gender: response.data.gender,
        };

        setPreferences((prev) => ({
          ...prev,
          [relationshipId]: formattedPreferences,
        }));

        // If this is the selected person, update their preferences
        if (selectedPerson && selectedPerson.id === relationshipId) {
          setSelectedPerson((prevPerson) => ({
            ...prevPerson,
            preferences: formattedPreferences,
          }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    } finally {
      setIsLoadingPreferences(false);
    }
  }

  useEffect(() => {
    fetchRelationships();
    fetchPreferences();
  }, []);

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
      description:
        "The thinnest, lightest Kindle Paperwhite yet—with a flush-front design and 300 ppi glare-free display.",
      price: 139.99,
      image: "/gifts/kindle.jpg",
      category: "Books",
      rating: 4.8,
      matchScore: 95,
      matchReasons: [
        "Matches interest in Reading",
        "Within budget range",
        "Highly rated gift",
      ],
      purchaseUrl: "https://amazon.com/kindle",
    },
    {
      id: 102,
      name: "Music Subscription",
      description:
        "Annual subscription to a premium music streaming service with millions of songs.",
      price: 99.99,
      image: "/gifts/music.jpg",
      category: "Experiences",
      rating: 4.7,
      matchScore: 92,
      matchReasons: [
        "Matches interest in Music",
        "Experience gift",
        "Within budget range",
      ],
      purchaseUrl: "https://spotify.com",
    },
    {
      id: 103,
      name: "Travel Journal Set",
      description:
        "Beautiful leather-bound travel journal with pen and accessories for documenting adventures.",
      price: 45.99,
      image: "/gifts/travel-journal.jpg",
      category: "Books",
      rating: 4.5,
      matchScore: 88,
      matchReasons: [
        "Matches interest in Travel",
        "Within budget range",
        "Practical gift",
      ],
      purchaseUrl: "https://journals.com/travel",
    },
    {
      id: 104,
      name: "World Literature Collection",
      description:
        "Collection of 5 award-winning novels from around the world, beautifully bound.",
      price: 79.99,
      image: "/gifts/books.jpg",
      category: "Books",
      rating: 4.4,
      matchScore: 82,
      matchReasons: [
        "Matches interest in Reading",
        "Within budget range",
        "Cultural value",
      ],
      purchaseUrl: "https://books.com/collection",
    },
    {
      id: 105,
      name: "Travel Experience Gift Card",
      description:
        "Gift card for booking travel experiences, tours, and activities worldwide.",
      price: 150,
      image: "/gifts/travel-card.jpg",
      category: "Experiences",
      rating: 4.6,
      matchScore: 85,
      matchReasons: [
        "Matches interest in Travel",
        "Experience gift",
        "Maximum budget value",
      ],
      purchaseUrl: "https://viator.com",
    },
  ];

  // Occasions list
  const occasions = [
    "Birthday",
    "Anniversary",
    "Christmas",
    "Graduation",
    "Wedding",
    "Housewarming",
    "Baby Shower",
    "Retirement",
    "Valentine's Day",
    "Mother's Day",
    "Father's Day",
    "Just Because",
  ];

  // Generate recommendations when a person is selected
  useEffect(() => {
    if (selectedPerson) {
      setIsLoading(true);

      // Filter gifts based on the person's interests and gift categories
      const personPrefs = selectedPerson.preferences || {};

      // Filter gifts that match interests or categories
      let filteredGifts = [...sampleGifts];

      if (personPrefs.interests && personPrefs.interests.length > 0) {
        // Prioritize gifts that match interests
        filteredGifts = filteredGifts.sort((a, b) => {
          const aMatchesInterest = a.matchReasons.some((reason) =>
            personPrefs.interests.some((interest) =>
              reason.toLowerCase().includes(interest.toLowerCase())
            )
          );

          const bMatchesInterest = b.matchReasons.some((reason) =>
            personPrefs.interests.some((interest) =>
              reason.toLowerCase().includes(interest.toLowerCase())
            )
          );

          if (aMatchesInterest && !bMatchesInterest) return -1;
          if (!aMatchesInterest && bMatchesInterest) return 1;
          return 0;
        });
      }

      // Filter by budget
      filteredGifts = filteredGifts.filter(
        (gift) => gift.price >= budget[0] && gift.price <= budget[1]
      );

      // Simulate API call delay
      setTimeout(() => {
        setGiftRecommendations(
          filteredGifts.length > 0 ? filteredGifts : sampleGifts
        );
        setCurrentGiftIndex(0);
        setIsLoading(false);
      }, 1500);
    } else {
      setGiftRecommendations([]);
    }
  }, [selectedPerson, selectedOccasion, budget]);

  const handlePersonSelect = (personId) => {
    const person = people.find((p) => p.id === personId);
    if (person) {
      if (preferences[personId]) {
        setSelectedPerson({
          ...person,
          preferences: preferences[personId],
        });
        const priceRange = preferences[personId].priceRange;
        if (priceRange) {
          setBudget([priceRange.min, priceRange.max]);
        } else {
          setBudget([50, 150]);
        }
      } else {
        // Fetch preferences for this person
        fetchPreferences(personId);

        setSelectedPerson(person);
        setBudget([50, 150]); // Default budget until preferences load
      }

      // Reset other selections
      setCurrentGiftIndex(0);
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
    setPreferences((prev) => ({
      ...prev,
      [selectedPerson.id]: preferencesData,
    }));

    // Update the selected person state
    setSelectedPerson((prevPerson) => ({
      ...prevPerson,
      preferences: preferencesData,
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
                  Select a person and occasion to get personalized gift
                  recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Person Selection */}
                <div className="space-y-2">
                  <Label htmlFor="person">Who are you shopping for?</Label>
                  <Select
                    value={selectedPerson?.id || ""}
                    onValueChange={handlePersonSelect}
                  >
                    <SelectTrigger id="person">
                      <SelectValue placeholder="Select a person" />
                    </SelectTrigger>
                    <SelectContent>
                      {people.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={person.avatar}
                                alt={person.name}
                              />
                              <AvatarFallback>
                                {person.name.charAt(0)}
                              </AvatarFallback>
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
                      {occasions.map((occasion) => (
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
                        // Filter gifts based on preferences
                        let filteredGifts = [...sampleGifts];

                        if (
                          selectedPerson?.preferences?.interests?.length > 0
                        ) {
                          filteredGifts = filteredGifts.filter((gift) =>
                            gift.matchReasons.some((reason) =>
                              selectedPerson.preferences.interests.some(
                                (interest) =>
                                  reason
                                    .toLowerCase()
                                    .includes(interest.toLowerCase())
                              )
                            )
                          );
                        }

                        setGiftRecommendations(
                          filteredGifts.length > 0 ? filteredGifts : sampleGifts
                        );
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
                      <AvatarImage
                        src={selectedPerson.avatar}
                        alt={selectedPerson.name}
                      />
                      <AvatarFallback>
                        {selectedPerson.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedPerson.name}</CardTitle>
                      <CardDescription>
                        {selectedPerson.relationship}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoadingPreferences ? (
                      <div className="flex items-center justify-center py-4">
                        <RefreshCwIcon className="h-6 w-6 text-purple-600 animate-spin" />
                        <span className="ml-2 text-sm text-gray-500">
                          Loading preferences...
                        </span>
                      </div>
                    ) : (
                      <>
                        {/* Interests */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Interests
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPerson.preferences?.interests?.map(
                              (interest) => (
                                <Badge key={interest} variant="secondary">
                                  {interest}
                                </Badge>
                              )
                            )}
                            {(!selectedPerson.preferences?.interests ||
                              selectedPerson.preferences.interests.length ===
                                0) && (
                              <span className="text-sm text-gray-400">
                                No interests specified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Gift Categories */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Preferred Gift Types
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPerson.preferences?.favorite_categories?.map(
                              (category) => (
                                <Badge key={category} variant="outline">
                                  {category}
                                </Badge>
                              )
                            )}
                            {(!selectedPerson.preferences
                              ?.favorite_categories ||
                              selectedPerson.preferences.favorite_categories
                                .length === 0) && (
                              <span className="text-sm text-gray-400">
                                No preferences specified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Dislikes */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Dislikes
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPerson.preferences?.dislikes?.map(
                              (dislike) => (
                                <Badge
                                  key={dislike}
                                  variant="destructive"
                                  className="bg-red-100 text-red-800 hover:bg-red-200"
                                >
                                  {dislike}
                                </Badge>
                              )
                            )}
                            {(!selectedPerson.preferences?.dislikes ||
                              selectedPerson.preferences.dislikes.length ===
                                0) && (
                              <span className="text-sm text-gray-400">
                                No dislikes specified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Additional Information
                          </h4>
                          <div className="text-sm">
                            {selectedPerson.preferences?.notes ? (
                              <p className="text-gray-600">
                                {selectedPerson.preferences.notes}
                              </p>
                            ) : (
                              <span className="text-gray-400">
                                No additional notes
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    )}
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
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Start Finding Gifts
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Select a person from the left panel to see personalized gift
                    recommendations.
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/person">Add People to Your Gift Circle</Link>
                  </Button>
                </div>
              </Card>
            ) : isLoading ? (
              <Card className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <RefreshCwIcon className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Finding Perfect Gifts
                  </h3>
                  <p className="text-gray-500">
                    Analyzing preferences and searching for the best gift ideas
                    for {selectedPerson.name}...
                  </p>
                </div>
              </Card>
            ) : giftRecommendations.length === 0 ? (
              <Card className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <GiftIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No Recommendations Found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find gift recommendations matching your
                    criteria. Try adjusting your preferences or budget.
                  </p>
                  <Button onClick={() => setPreferencesModalOpen(true)}>
                    Update Preferences
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Current Gift Recommendation Card */}
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-64 md:h-auto relative">
                      <img
                        src={currentGift.image || "/placeholder-gift.jpg"}
                        alt={currentGift.name}
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute top-4 left-4 bg-purple-600 text-white rounded-full px-3 py-1 font-medium">
                        {currentGift.matchScore}% Match
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <Badge className="mb-2">{currentGift.category}</Badge>
                        <h2 className="text-2xl font-bold mb-2">
                          {currentGift.name}
                        </h2>
                        <p className="text-gray-700 mb-4">
                          {currentGift.description}
                        </p>
                        <div className="text-lg font-semibold text-purple-600 mb-4">
                          ${currentGift.price}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Why this is a good match:
                        </h3>
                        <ul className="space-y-1">
                          {currentGift.matchReasons.map((reason, i) => (
                            <li key={i} className="flex items-start">
                              <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span className="text-sm">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          asChild
                        >
                          <a
                            href={currentGift.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Item
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setConfirmPurchaseOpen(true)}
                        >
                          Add to Gift History
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousGift}
                      disabled={currentGiftIndex === 0}
                    >
                      Previous Gift
                    </Button>
                    <div className="text-sm text-gray-500">
                      {currentGiftIndex + 1} of {giftRecommendations.length}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextGift}
                      disabled={
                        currentGiftIndex === giftRecommendations.length - 1
                      }
                    >
                      Next Gift
                    </Button>
                  </div>
                </Card>

                {/* Filters and Results Count */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    More Recommendations
                    <span className="text-gray-500 ml-2 text-sm font-normal">
                      ({giftRecommendations.length - 1} more)
                    </span>
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFiltersOpen(true)}
                  >
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* More Recommendations */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    More Recommendations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {giftRecommendations.map(
                      (gift, index) =>
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
                              <h4 className="font-medium mb-1 line-clamp-1">
                                {gift.name}
                              </h4>
                              <div className="flex justify-between items-center">
                                <Badge variant="outline" className="text-xs">
                                  {gift.category}
                                </Badge>
                                <span className="text-sm font-medium">
                                  ${gift.price}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        )
                    )}
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
        <Dialog
          open={confirmPurchaseOpen}
          onOpenChange={setConfirmPurchaseOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Gift History</DialogTitle>
              <DialogDescription>
                Record this gift in your history to remember what you've given
                to {selectedPerson?.name}.
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
                <p className="text-sm text-gray-500">
                  ${currentGift.price} • {currentGift.category}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="purchase-date">
                  When did you give this gift?
                </Label>
                <Input
                  id="purchase-date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
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
              <Button
                variant="outline"
                onClick={() => setConfirmPurchaseOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handlePurchase}>Save to Gift History</Button>
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
              <Link href="/gift-history">View Gift History</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
