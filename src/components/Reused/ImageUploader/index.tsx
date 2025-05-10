"use client";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { CrossIcon } from "lucide-react";
import Image from "next/image";
// import { Label } from "@radix-ui/react-dropdown-menu";
import React, { Dispatch, SetStateAction } from "react";

type TImageType = {
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
  setPreviewImage: Dispatch<SetStateAction<[] | string[]>>;
  previewImage: string[];
};

const ImageUploader = ({
  setImageFiles,
  setPreviewImage,
  previewImage,
}: TImageType) => {
  const handleImageSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files![0];
    console.log(previewImage);
    setImageFiles((imageFiles) => [...imageFiles, file]);
    if (file) {
      const reader = new FileReader(); //read the file and make the file to data Url Link
      reader.onloadend = () => {
        //check if the Url Load is Done
        setPreviewImage((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImage((prev) => prev.filter((_, idx) => idx !== index));
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <Input
        onChange={handleImageSet}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="image-uploader"
      ></Input>
      <Label
        className="border-2 mt-8 text-black border-dashed border-rose-400 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 bg-rose-50 hover:bg-rose-100 transition-all cursor-pointer text-center"
        htmlFor="image-uploader"
      >
        Upload Logo
      </Label>
      <div className="w-80 rounded-4xl mt-8 flex gap-6">
        {previewImage.map((img, idx) => (
          <div key={idx} className="relative inline-block m-2">
            <Image
              src={img}
              alt=""
              width={100}
              height={100}
              className="rounded-md"
            />
            <div
              onClick={() => handleRemoveImage(idx)}
              className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center cursor-pointer text-xs"
            >
              ×
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
