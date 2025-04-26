"use client";

import { useEffect, useState } from "react";
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
  ChevronLeftIcon,
  ChevronRightIcon,
  GiftIcon,
  PlusIcon,
  TrashIcon,
  SearchIcon,
  PencilIcon,
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
import AddEditPersonModal from "@/components/custom/Modals/PersonModal";
import DeletePersonModal from "@/components/custom/Modals/DeletePerson";
import {
  deleteRelationship,
  getAllRelationships,
} from "@/lib/api/relationship";
import PersonPreferencesModal from "@/components/custom/Modals/Preferences";
import { getRelationshipPreferences } from "@/lib/api/relate-preferences";

export default function PeoplePage() {
  const [addEditPersonModalOpen, setAddEditPersonModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editPerson, setEditPerson] = useState({});
  const [deletePerson, setDeletePerson] = useState({});
  const [people, setPeople] = useState([]);
  const [editPreferencesOpen, setEditPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState({});

  const handleSavePerson = (personData) => {
    setAddEditPersonModalOpen(false);
  };

  const handleEditClick = (person) => {
    setEditPerson(person);
    setIsEditMode(true);
    setAddEditPersonModalOpen(true);
  };

  const handleEditPreferencesClick = (person) => {
    setEditPerson(person);
    setEditPreferencesOpen(true);
  };

  const handleEditPreferences = (preferences) => {
    setEditPreferencesOpen(false);
  };

  const handlePersonModalCLose = () => {
    if (isEditMode) setIsEditMode(false);
    setAddEditPersonModalOpen(false);
  };

  const handleDeletePerson = async (id) => {
    try {
      const response = await deleteRelationship(id);
    } catch (error) {
      console.error("Failed to delete user", error);
    }
    setDeleteModalOpen(false);
  };

  const handleDeletePersonClick = (person) => {
    setDeletePerson(person);
    setDeleteModalOpen(true);
  };

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await getAllRelationships(
        "00f70814-88b5-417e-8c27-26f221313902"
      );
      setPeople(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserPreferences() {
    try {
      const response = await getRelationshipPreferences(
        "ff3fa1e5-a25d-413e-98f5-87249a7f6f3c"
      );
      setPreferences(response.data);
    } catch (error) {
      console.error("Failed to fetch user preferences:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchUserPreferences();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const peoplePerPage = 10;

  // Filter people based on search term and relationship filter
  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.relationship_type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get unique relationships for filter dropdown
  const uniqueRelationships = [
    ...new Set(people.map((person) => person.relationship_type)),
  ];

  // Calculate pagination
  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = filteredPeople.slice(
    indexOfFirstPerson,
    indexOfLastPerson
  );
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
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            People Management
          </h2>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setAddEditPersonModalOpen(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add New Person
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Your Gift Circle</CardTitle>
            <CardDescription>
              Manage your friends, family, and other important people
            </CardDescription>
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
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Birthday</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPeople.length > 0 ? (
                    currentPeople.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell>
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={person.avatar}
                              alt={person.name}
                            />
                            <AvatarFallback>
                              {person.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">
                          {person.name}
                        </TableCell>
                        <TableCell>{person.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {person.relationship_type}
                          </Badge>
                        </TableCell>
                        <TableCell>{person.birthdate}</TableCell>
                        <TableCell>{person.phone_number}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 cursor-pointer"
                              title="Find Gift"
                            >
                              <GiftIcon className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 cursor-pointer"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEditClick(person)}
                                  className="cursor-pointer"
                                >
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleEditPreferencesClick(person)
                                  }
                                  className="cursor-pointer"
                                >
                                  Edit Preferences
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  Manage Important Dates
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                              title="Delete"
                              onClick={() => handleDeletePersonClick(person)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
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
                  Showing {indexOfFirstPerson + 1} to{" "}
                  {Math.min(indexOfLastPerson, filteredPeople.length)} of{" "}
                  {filteredPeople.length} people
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
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
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
      </div>
      <AddEditPersonModal
        isOpen={addEditPersonModalOpen}
        onClose={handlePersonModalCLose}
        onSave={handleSavePerson}
        person={isEditMode ? editPerson : null}
      />
      <DeletePersonModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeletePerson}
        person={deletePerson}
      />
      <PersonPreferencesModal
        isOpen={editPreferencesOpen}
        onClose={() => setEditPreferencesOpen(false)}
        onSave={handleEditPreferences}
        person={editPerson}
        preferences={preferences ? preferences : null}
      />
    </div>
  );
}
