import api from './api';
import { CreateInstructorRequest } from '@/models/instructors/CreateInstructorRequest';
import { InstructorDto } from '@/models/instructors/InstructorDto';
import { UpdateInstructorRequest } from '@/models/instructors/UpdateInstructorRequest';

export const getInstructors = async (): Promise<InstructorDto[]> => {
  const response = await api.get<InstructorDto[]>("instructors/getall");
  return response.data;
}

export const getInstructorById = async (id: number): Promise<InstructorDto> => {
  const response = await api.get<InstructorDto>(`instructors/getone/${id}`);
  return response.data;
}

export const createInstructor = async (request: CreateInstructorRequest): Promise<InstructorDto> => {
  const response = await api.post<InstructorDto>("instructors/add", request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const updateInstructor = async (id: number, request: UpdateInstructorRequest): Promise<InstructorDto> => {
  const response = await api.put<InstructorDto>(`instructors/update/${id}`, request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const deleteInstructor = async (id: number): Promise<InstructorDto> => {
  const response = await api.delete<InstructorDto>(`instructors/delete/${id}`);
  return response.data;
}
