"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCategory } from "@/services/AuthServices/Shop";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export interface ICategory {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
  parent?: string | null;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

const handleDelete = async (data: ICategory) => {
  const res = await deleteCategory(data._id);
  console.log(res);
  if (res.success) {
    toast.success("Category Deleted Succesfully");
  } else {
    toast.error("Category Deletetion Failed");
  }
};

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "name",
    header: () => <div>Category Name</div>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Image
          src={row.original.icon as string}
          alt={row.original.name as string}
          width={40}
          height={40}
          className="w-8 h-8 rounded-full"
        />
        <span className="truncate">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: () => <div>isActive</div>,
    cell: ({ row }) => (
      <div>
        {row.original.isActive ? (
          <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
            True
          </p>
        ) : (
          <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
            False
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: () => <div>Action</div>,
    cell: ({ row }) => (
      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <Trash className="w-5 ml-3 h-5" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Category and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(row.original)}>
              Delete <Trash className="w-5 h-5" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
];
