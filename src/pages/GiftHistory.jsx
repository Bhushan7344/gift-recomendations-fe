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
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  GiftIcon, 
  HomeIcon,
  SearchIcon,
  CalendarIcon,
  FilterIcon
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function GiftHistoryPage() {
  const [gifts, setGifts] = useState([
    { id: 1, name: "Wireless Headphones", recipient: "Sarah Johnson", relationship: "Sister", date: "2023-10-15", occasion: "Birthday", price: "$89.99", image: "/gifts/headphones.jpg" },
    { id: 2, name: "Scented Candle Set", recipient: "Emma Davis", relationship: "Partner", date: "2023-09-22", occasion: "Anniversary", price: "$35.50", image: "/gifts/candles.jpg" },
    { id: 3, name: "Leather Wallet", recipient: "Robert Johnson", relationship: "Father", date: "2023-06-18", occasion: "Father's Day", price: "$65.00", image: "/gifts/wallet.jpg" },
    { id: 4, name: "Silk Scarf", recipient: "Mary Johnson", relationship: "Mother", date: "2023-05-14", occasion: "Mother's Day", price: "$45.75", image: "/gifts/scarf.jpg" },
    { id: 5, name: "Video Game", recipient: "James Wilson", relationship: "Brother", date: "2023-02-28", occasion: "Birthday", price: "$59.99", image: "/gifts/game.jpg" },
    { id: 6, name: "Cookbook", recipient: "Patricia Brown", relationship: "Aunt", date: "2023-03-17", occasion: "Housewarming", price: "$24.99", image: "/gifts/cookbook.jpg" },
    { id: 7, name: "Wine Bottle", recipient: "Michael Smith", relationship: "Friend", date: "2023-04-05", occasion: "Dinner Party", price: "$32.00", image: "/gifts/wine.jpg" },
    { id: 8, name: "Office Plant", recipient: "Elizabeth Taylor", relationship: "Colleague", date: "2023-05-22", occasion: "Promotion", price: "$28.50", image: "/gifts/plant.jpg" },
    { id: 9, name: "Bluetooth Speaker", recipient: "David Miller", relationship: "Cousin", date: "2023-06-10", occasion: "Graduation", price: "$79.99", image: "/gifts/speaker.jpg" },
    { id: 10, name: "Yoga Mat", recipient: "Jennifer White", relationship: "Friend", date: "2023-07-07", occasion: "Birthday", price: "$42.00", image: "/gifts/yoga.jpg" },
    { id: 11, name: "Grilling Set", recipient: "Thomas Brown", relationship: "Uncle", date: "2023-08-15", occasion: "Retirement", price: "$95.00", image: "/gifts/grill.jpg" },
    { id: 12, name: "Baked Goods", recipient: "Susan Anderson", relationship: "Neighbor", date: "2023-09-03", occasion: "Thank You", price: "$18.75", image: "/gifts/baked.jpg" },
    { id: 13, name: "Photo Album", recipient: "Charles Martin", relationship: "Grandfather", date: "2023-10-30", occasion: "Birthday", price: "$29.99", image: "/gifts/album.jpg" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [occasionFilter, setOccasionFilter] = useState("");
  const [recipientFilter, setRecipientFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  
  const giftsPerPage = 10;
  
  // Filter gifts based on search term, occasion, recipient, and date range
  const filteredGifts = gifts.filter(gift => {
    const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          gift.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOccasion = occasionFilter === "" || gift.occasion === occasionFilter;
    const matchesRecipient = recipientFilter === "" || gift.recipient === recipientFilter;
    
    // Date filtering
    let matchesDate = true;
    if (dateRange.from) {
      const giftDate = new Date(gift.date);
      if (dateRange.to) {
        // Range filtering
        matchesDate = giftDate >= dateRange.from && giftDate <= dateRange.to;
      } else {
        // Single date filtering
        matchesDate = giftDate.toDateString() === dateRange.from.toDateString();
      }
    }
    
    return matchesSearch && matchesOccasion && matchesRecipient && matchesDate;
  });
  
  // Get unique occasions and recipients for filter dropdowns
  const uniqueOccasions = [...new Set(gifts.map(gift => gift.occasion))];
  const uniqueRecipients = [...new Set(gifts.map(gift => gift.recipient))];
  
  // Calculate pagination
  const indexOfLastGift = currentPage * giftsPerPage;
  const indexOfFirstGift = indexOfLastGift - giftsPerPage;
  const currentGifts = filteredGifts.slice(indexOfFirstGift, indexOfLastGift);
  const totalPages = Math.ceil(filteredGifts.length / giftsPerPage);

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

  const clearFilters = () => {
    setSearchTerm("");
    setOccasionFilter("");
    setRecipientFilter("");
    setDateRange({ from: undefined, to: undefined });
    setCurrentPage(1);
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
          <h2 className="text-3xl font-bold text-gray-900">Gift History</h2>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Your Gift Records</CardTitle>
            <CardDescription>Track all the gifts you've given to your loved ones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by gift name or recipient..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
              
              <Select 
                value={occasionFilter} 
                onValueChange={(value) => {
                  setOccasionFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="occasion">All Occasions</SelectItem>
                  {uniqueOccasions.map(occasion => (
                    <SelectItem key={occasion} value={occasion}>
                      {occasion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={recipientFilter} 
                onValueChange={(value) => {
                  setRecipientFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recipients">All Recipients</SelectItem>
                  {uniqueRecipients.map(recipient => (
                    <SelectItem key={recipient} value={recipient}>
                      {recipient}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-[180px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM d, yyyy")
                      )
                    ) : (
                      <span>Date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range);
                      setCurrentPage(1);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button variant="ghost" onClick={clearFilters} className="md:w-auto">
                Clear Filters
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Gift</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Occasion</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGifts.length > 0 ? (
                    currentGifts.map((gift) => (
                      <TableRow key={gift.id}>
                        <TableCell>
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                            <img src={gift.image} alt={gift.name} className="h-full w-full object-cover" />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{gift.name}</TableCell>
                        <TableCell>
                          <div>
                            {gift.recipient}
                            <div className="text-xs text-gray-500">{gift.relationship}</div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(gift.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{gift.occasion}</Badge>
                        </TableCell>
                        <TableCell>{gift.price}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No gift records found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredGifts.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstGift + 1} to {Math.min(indexOfLastGift, filteredGifts.length)} of {filteredGifts.length} gifts
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
            
            {/* Export options */}
            <div className="mt-6 flex justify-end">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Export CSV
                </Button>
                <Button variant="outline" size="sm">
                  Print History
                </Button>
              </div>
            </div>
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
