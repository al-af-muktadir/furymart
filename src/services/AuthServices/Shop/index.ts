/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createShop = async (data: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
    method: "POST",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },
    body: data,
  });
  return res.json();
};

export const createCategory = async (data: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
    method: "POST",
    headers: {
      Authorization: (await cookies()).get("accessToken")!.value,
    },

    body: data,
  });
  revalidateTag("CATEGORIES");
  return res.json();
};

export const getCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
    next: {
      tags: ["CATEGORIES"],
    },
  });
  return res.json();
};

export const deleteCategory = async (id: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/category/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    }
  );
  revalidateTag("CATEGORIES");
  return res.json();
};
