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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function AddEditPersonModal({
  isOpen,
  onClose,
  onSave,
  person = null, // null for add, object for edit
  relationship_types = ["Friend", "Family", "Partner", "Colleague", "Other"],
}) {
  const isEditMode = !!person;

  const [formData, setFormData] = useState({
    name: "",
    relationship_type: "",
    email: "",
    phone_number: "",
    notes: "",
    birthdate: undefined,
    anniversary: undefined,
    avatar: "",
  });

  // Initialize form with person data if in edit mode
  useEffect(() => {
    if (isEditMode && person) {
      setFormData({
        name: person.name || "",
        relationship_type: person.relationship_type || "",
        email: person.email || "",
        phone_number: person.phone_number || "",
        notes: person.notes || "",
        birthdate: person.birthdate ? new Date(person.birthdate) : undefined,
        anniversary: person.anniversary
          ? new Date(person.anniversary)
          : undefined,
      });
    } else {
      // Reset form for add mode
      setFormData({
        name: "",
        relationship_type: "",
        email: "",
        phone_number: "",
        notes: "",
        birthdate: undefined,
        anniversary: undefined,
      });
    }
  }, [person, isEditMode, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: isEditMode ? person.id : Date.now(), // Use existing ID or generate new one
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Person" : "Add New Person"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the details of this person in your gift circle."
                : "Add a new person to your gift circle to start finding perfect gifts for them."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">
              Avatar URL
            </Label>
            <Input
              id="avatar"
              type="url"
              value={formData.avatar}
              onChange={(e) => handleChange("avatar", e.target.value)}
              className="col-span-3"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship_type" className="text-right">
                relationship_type
              </Label>
              <Select
                value={formData.relationship_type}
                onValueChange={(value) =>
                  handleChange("relationship_type", value)
                }
              >
                <SelectTrigger id="relationship_type" className="col-span-3">
                  <SelectValue placeholder="Select relationship_type" />
                </SelectTrigger>
                <SelectContent>
                  {relationship_types.map((rel) => (
                    <SelectItem key={rel} value={rel}>
                      {rel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone_number" className="text-right">
                phone_number
              </Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthdate" className="text-right">
                birthdate
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.birthdate ? (
                        format(formData.birthdate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.birthdate}
                      onSelect={(date) => handleChange("birthdate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="anniversary" className="text-right">
                Anniversary
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.anniversary ? (
                        format(formData.anniversary, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.anniversary}
                      onSelect={(date) => handleChange("anniversary", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="col-span-3"
                placeholder="Add any additional notes about this person..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isEditMode ? "Save Changes" : "Add Person"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
