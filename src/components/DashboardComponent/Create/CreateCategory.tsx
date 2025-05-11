"use client";
import ImageUploader from "@/components/Reused/ImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/services/AuthServices/Shop";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateCategory = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [previewImage, setPreviewImage] = useState<string[] | []>([]);
  const form = useForm();
  const isSubmitting = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("icon", imageFiles[0]);

    const res = await createCategory(formData);
    if (res.success) {
      toast.success("Category Created");
    } else {
      toast.success("Category Creation Failed!!!");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Create Your Shop&apos;s Product Category
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-3 space-y-2">
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6">
              <div className="col-span-4 md:col-span-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description:</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-36 mt-3"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <ImageUploader
              setImageFiles={setImageFiles}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
            />
            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </Form>

        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" className="col-span-3" />
          </div>
          <div className="flex justify-between items-center gap-4">
            <Label className="text-right">Image Upload</Label>
            <ImageUploader
              setImageFiles={setImageFiles}
              setPreviewImage={setPreviewImage}
              previewImage={previewImage}
            />
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
