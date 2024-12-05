import axios from "axios";

// Dtos
import { CategoryDto } from '@/models/categories/CategoryDto';
import { CreateCategoryRequest } from '@/models/categories/CreateCategoryRequest';
import { UpdateCategoryRequest } from '@/models/categories/UpdateCategoryRequest';
import { CreateEventRequest } from '@/models/events/CreateEventRequest';
import { EventDto } from '@/models/events/EventDto';
import { UpdateEventRequest } from '@/models/events/UpdateEventRequest';
import { CreateInstructorRequest } from '@/models/instructors/CreateInstructorRequest';
import { InstructorDto } from '@/models/instructors/InstructorDto';
import { UpdateInstructorRequest } from '@/models/instructors/UpdateInstructorRequest';
import { CreateVideoEducationRequest } from '@/models/videoEducations/CreateVideoEducationRequest';
import { UpdateVideoEducationRequest } from '@/models/videoEducations/UpdateVideoEducationRequest';
import { VideoEducationDto } from '@/models/videoEducations/VideoEducationDto';

const api = axios.create({
  baseURL: "https://localhost:7192/api/",
});

export const getCategories = async (): Promise<CategoryDto[]> => {
  const response = await api.get<CategoryDto[]>("category/getlist");
  return response.data;
}

export const getAppointments = async (): Promise<
  ServiceResult<Appointment[]>
> => {
  const response = await api.get<ServiceResult<Appointment[]>>("appointments");
  return response.data;
};

export const getAppointmentById = async (
  id: string
): Promise<ServiceResult<Appointment>> => {
  const response = await api.get<ServiceResult<Appointment>>(
    `appointments/${id}`
  );
  return response.data;
};

export const createAppointment = async (
  createAppointmentRequest: CreateAppointmentRequest
): Promise<ServiceResult<Appointment>> => {
  const response = await api.post<ServiceResult<Appointment>>(
    "appointments",
    createAppointmentRequest,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getDoctors = async (): Promise<ServiceResult<Doctor[]>> => {
  const response = await api.get<ServiceResult<Doctor[]>>("doctors");
  return response.data;
};

export const getDoctorById = async (
  id: number
): Promise<ServiceResult<Doctor>> => {
  const response = await api.get<ServiceResult<Doctor>>(`doctors/${id}`);
  return response.data;
};

export const createDoctor = async (
  createDoctorRequest: CreateDoctorRequest
): Promise<ServiceResult<Doctor>> => {
  const response = await api.post<ServiceResult<Doctor>>(
    "doctors",
    createDoctorRequest,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getPatients = async (): Promise<ServiceResult<Patient[]>> => {
  const response = await api.get<ServiceResult<Patient[]>>("patients");
  return response.data;
};

export const getPatientById = async (
  id: string
): Promise<ServiceResult<Patient>> => {
  const response = await api.get<ServiceResult<Patient>>(`patients/${id}`);
  return response.data;
};

export const createPatient = async (
  createPatientRequest: CreatePatientRequest
): Promise<ServiceResult<Patient>> => {
  const response = await api.post<ServiceResult<Patient>>(
    "patients",
    createPatientRequest,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export default api;
