import api from './api';
import { CategoryDto } from '@/models/categories/CategoryDto';
import { CreateCategoryRequest } from '@/models/categories/CreateCategoryRequest';
import { UpdateCategoryRequest } from '@/models/categories/UpdateCategoryRequest';

export const getCategories = async (): Promise<CategoryDto[]> => {
  const response = await api.get<CategoryDto[]>("category/getlist");
  return response.data;
}

export const getCategoryById = async (id: number): Promise<CategoryDto> => {
  const response = await api.get<CategoryDto>(`category/${id}`);
  return response.data;
}

export const createCategory = async (request: CreateCategoryRequest): Promise<CategoryDto> => {
  const response = await api.post<CategoryDto>("category/add", request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const updateCategory = async (id: number, request: UpdateCategoryRequest): Promise<CategoryDto> => {
  const response = await api.put<CategoryDto>(`category/update/${id}`, request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const deleteCategory = async (id: number): Promise<CategoryDto> => {
  const response = await api.delete<CategoryDto>(`category/${id}`);
  return response.data;
}
