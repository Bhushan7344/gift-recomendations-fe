"use client";

import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DeletePersonModal({ 
  isOpen, 
  onClose, 
  onDelete, 
  person 
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={person?.avatar} alt={person?.name} />
              <AvatarFallback>{person?.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <AlertDialogTitle>Delete {person?.name}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Are you sure you want to delete {person?.name} from your gift circle? 
            This action cannot be undone and all associated preferences and gift history will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => onDelete(person?.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
