import CreateCategory from "@/components/DashboardComponent/Create/CreateCategory";
import { columns } from "@/components/DashboardComponent/Table/coloumns";
import { DataTable } from "@/components/DashboardComponent/Table/data-table";
import { getCategory } from "@/services/AuthServices/Shop";
import React from "react";

const Category = async () => {
  // const data = await getData();
  const res = await getCategory();
  console.log(res);
  return (
    <div>
      <div className="flex justify-end">
        <CreateCategory />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={res.data} />
      </div>
    </div>
  );
};

export default Category;
