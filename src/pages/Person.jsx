"use client";

import { useState } from "react";
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
  ChevronLeftIcon, 
  ChevronRightIcon, 
  GiftIcon, 
  PlusIcon, 
  Pencil1Icon, 
  TrashIcon, 
  HeartIcon,
  HomeIcon,
  SearchIcon,
  PencilIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PeoplePage() {
  const [people, setPeople] = useState([
    { id: 1, name: "Sarah Johnson", relationship: "Sister", birthday: "Nov 15", lastGift: "Wireless Headphones", avatar: "/avatars/sarah.png" },
    { id: 2, name: "Emma Davis", relationship: "Partner", birthday: "Nov 22", lastGift: "Scented Candle Set", avatar: "/avatars/emma.png" },
    { id: 3, name: "Robert Johnson", relationship: "Father", birthday: "Dec 1", lastGift: "Leather Wallet", avatar: "/avatars/dad.png" },
    { id: 4, name: "Mary Johnson", relationship: "Mother", birthday: "Jan 12", lastGift: "Silk Scarf", avatar: "/avatars/mom.png" },
    { id: 5, name: "James Wilson", relationship: "Brother", birthday: "Feb 28", lastGift: "Video Game", avatar: "/avatars/james.png" },
    { id: 6, name: "Patricia Brown", relationship: "Aunt", birthday: "Mar 17", lastGift: "Cookbook", avatar: "/avatars/patricia.png" },
    { id: 7, name: "Michael Smith", relationship: "Friend", birthday: "Apr 5", lastGift: "Wine Bottle", avatar: "/avatars/michael.png" },
    { id: 8, name: "Elizabeth Taylor", relationship: "Colleague", birthday: "May 22", lastGift: "Office Plant", avatar: "/avatars/elizabeth.png" },
    { id: 9, name: "David Miller", relationship: "Cousin", birthday: "Jun 10", lastGift: "Bluetooth Speaker", avatar: "/avatars/david.png" },
    { id: 10, name: "Jennifer White", relationship: "Friend", birthday: "Jul 7", lastGift: "Yoga Mat", avatar: "/avatars/jennifer.png" },
    { id: 11, name: "Thomas Brown", relationship: "Uncle", birthday: "Aug 15", lastGift: "Grilling Set", avatar: "/avatars/thomas.png" },
    { id: 12, name: "Susan Anderson", relationship: "Neighbor", birthday: "Sep 3", lastGift: "Baked Goods", avatar: "/avatars/susan.png" },
    { id: 13, name: "Charles Martin", relationship: "Grandfather", birthday: "Oct 30", lastGift: "Photo Album", avatar: "/avatars/charles.png" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [relationshipFilter, setRelationshipFilter] = useState("");
  
  const peoplePerPage = 10;
  
  // Filter people based on search term and relationship filter
  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          person.relationship.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRelationship = relationshipFilter === "" || person.relationship === relationshipFilter;
    return matchesSearch && matchesRelationship;
  });
  
  // Get unique relationships for filter dropdown
  const uniqueRelationships = [...new Set(people.map(person => person.relationship))];
  
  // Calculate pagination
  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = filteredPeople.slice(indexOfFirstPerson, indexOfLastPerson);
  const totalPages = Math.ceil(filteredPeople.length / peoplePerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GiftIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">GiftWise</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <HomeIcon className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">People Management</h2>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <PlusIcon className="mr-2 h-4 w-4" /> Add New Person
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Your Gift Circle</CardTitle>
            <CardDescription>Manage your friends, family, and other important people</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by name or relationship..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
              <Select 
                value={relationshipFilter} 
                onValueChange={(value) => {
                  setRelationshipFilter(value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relations">All Relationships</SelectItem>
                  {uniqueRelationships.map(relationship => (
                    <SelectItem key={relationship} value={relationship}>
                      {relationship}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Birthday</TableHead>
                    <TableHead>Last Gift</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPeople.length > 0 ? (
                    currentPeople.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell>
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={person.avatar} alt={person.name} />
                            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{person.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{person.relationship}</Badge>
                        </TableCell>
                        <TableCell>{person.birthday}</TableCell>
                        <TableCell>{person.lastGift}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0" title="Find Gift">
                              <GiftIcon className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                  <PencilIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Preferences
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Manage Important Dates
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No people found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredPeople.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstPerson + 1} to {Math.min(indexOfLastPerson, filteredPeople.length)} of {filteredPeople.length} people
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  
                  {/* Page numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      // Logic to show pages around current page
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className="h-8 w-8"
                          onClick={() => goToPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GiftIcon className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-semibold">GiftWise</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">About</Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-xs text-gray-400">© 2023 GiftWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
