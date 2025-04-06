"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  GiftIcon,
  PlusCircleIcon,
  UserIcon,
  HeartIcon,
  HistoryIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddEditPersonModal from "@/components/custom/Modals/PersonModal";
import Link from "next/link";

const HomePage = () => {
  const [addEditPersonModalOpen, setAddEditPersonModalOpen] = useState(false);

  const handleSavePerson = (personData) => {
    console.log("Person saved:", personData);
    setAddEditPersonModalOpen(false);
  };

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      name: "Sarah's Birthday",
      date: "Nov 15, 2023",
      relationship: "Sister",
      daysLeft: 5,
    },
    {
      id: 2,
      name: "Anniversary with Emma",
      date: "Nov 22, 2023",
      relationship: "Partner",
      daysLeft: 12,
    },
    {
      id: 3,
      name: "Dad's Retirement",
      date: "Dec 1, 2023",
      relationship: "Father",
      daysLeft: 21,
    },
  ]);

  const [recentRecipients, setRecentRecipients] = useState([
    {
      id: 1,
      name: "Sarah",
      relationship: "Sister",
      avatar: "/avatars/sarah.png",
    },
    {
      id: 2,
      name: "Emma",
      relationship: "Partner",
      avatar: "/avatars/emma.png",
    },
    { id: 3, name: "Dad", relationship: "Father", avatar: "/avatars/dad.png" },
    { id: 4, name: "Mom", relationship: "Mother", avatar: "/avatars/mom.png" },
  ]);

  const [recentGifts, setRecentGifts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      recipient: "Sarah",
      date: "Oct 15, 2023",
      image: "/gifts/headphones.jpg",
    },
    {
      id: 2,
      name: "Scented Candle Set",
      recipient: "Emma",
      date: "Sep 22, 2023",
      image: "/gifts/candles.jpg",
    },
  ]);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, John!
        </h2>
        <p className="text-gray-600">
          Ready to find the perfect gift for someone special?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Find a Gift</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Get personalized recommendations for anyone in your circle
            </p>
            <Link href="/start-gifting">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer">
                <GiftIcon className="mr-2 h-4 w-4" /> Start Gifting
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Add a Person</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Add friends or family members to your gift circle
            </p>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => setAddEditPersonModalOpen(true)}
            >
              <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Person
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gift History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              View your past gifts and plan future ones
            </p>
            <Link href="/gift-history">
              <Button variant="outline" className="w-full cursor-pointer">
                <HistoryIcon className="mr-2 h-4 w-4" /> View History
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-purple-600" />
            Upcoming Events
          </CardTitle>
          <CardDescription>Don't miss these important dates</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <CalendarIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.name}</h3>
                      <p className="text-sm text-gray-500">
                        {event.date} • {event.relationship}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      variant={event.daysLeft <= 7 ? "destructive" : "outline"}
                      className="mr-3"
                    >
                      {event.daysLeft} days left
                    </Badge>
                    <Button size="sm">Find Gift</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No upcoming events</p>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end">
          <Button variant="ghost" size="sm">
            View All Events
          </Button>
        </CardFooter>
      </Card>

      {/* People and Gifts Tabs */}
      <Tabs defaultValue="people" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="people">Your People</TabsTrigger>
          <TabsTrigger value="gifts">Recent Gifts</TabsTrigger>
        </TabsList>

        <TabsContent value="people">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-purple-600" />
                People in Your Gift Circle
              </CardTitle>
              <CardDescription>Manage your friends and family</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recentRecipients.map((person) => (
                    <div
                      key={person.id}
                      className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium text-center">{person.name}</h3>
                      <p className="text-sm text-gray-500 text-center">
                        {person.relationship}
                      </p>
                      <div className="mt-3 flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <GiftIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Link href="person">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                Manage All People
              </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="gifts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GiftIcon className="mr-2 h-5 w-5 text-purple-600" />
                Your Recent Gifts
              </CardTitle>
              <CardDescription>
                Gifts you've recently purchased or saved
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentGifts.length > 0 ? (
                <div className="space-y-4">
                  {recentGifts.map((gift) => (
                    <div
                      key={gift.id}
                      className="flex items-center p-3 bg-white border rounded-lg hover:bg-gray-50"
                    >
                      <div className="h-16 w-16 rounded-md overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                        <img
                          src={gift.image}
                          alt={gift.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{gift.name}</h3>
                        <p className="text-sm text-gray-500">
                          For: {gift.recipient} • {gift.date}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <HistoryIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No recent gifts
                </p>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Link href="/gift-history">
                <Button variant="ghost" size="sm">
                  View Gift History
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <AddEditPersonModal
        isOpen={addEditPersonModalOpen}
        onClose={() => setAddEditPersonModalOpen(false)}
        onSave={handleSavePerson}
      />
    </main>
  );
};

export default HomePage;
