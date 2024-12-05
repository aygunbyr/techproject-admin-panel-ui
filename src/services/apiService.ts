import axios from "axios";
import { Appointment } from "@/types/Appointment";
import { Doctor } from "@/types/Doctor";
import { Patient } from "@/types/Patient";
import { ServiceResult } from "@/types/ServiceResult";
import { CreateDoctorRequest } from "@/types/dtos/CreateDoctorRequest";
import { CreatePatientRequest } from "@/types/dtos/CreatePatientRequest";
import { CreateAppointmentRequest } from "@/types/dtos/CreateAppointmentRequest";

const api = axios.create({
  baseURL: "https://localhost:7192/api/",
});

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
