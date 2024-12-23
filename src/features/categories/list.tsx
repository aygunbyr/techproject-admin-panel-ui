"use client";
import EntityList from "@/components/EntityList";
import { CategoryDto } from '@/api/dtos/categories/CategoryDto';
import { getCategories, deleteCategory } from "@/api/categories";

const columns = [
  { field: "id", headerName: "Category ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "createdDate", headerName: "Created Date", flex: 1 },
  { field: "updatedDate", headerName: "Updated Date", flex: 1 },
];

export default function CategoriesList() {
  return (
    <EntityList<CategoryDto, number>
      entityName="categories"
      entityNameSingular="category"
      getItems={getCategories}
      deleteItem={deleteCategory}
      columns={columns}
    />
  );
}
