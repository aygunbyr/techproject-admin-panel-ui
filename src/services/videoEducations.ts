import api from './api';
import { CreateVideoEducationRequest } from '@/models/videoEducations/CreateVideoEducationRequest';
import { UpdateVideoEducationRequest } from '@/models/videoEducations/UpdateVideoEducationRequest';
import { VideoEducationDto } from '@/models/videoEducations/VideoEducationDto';

export const getVideoEducations = async (): Promise<VideoEducationDto[]> => {
  const response = await api.get<VideoEducationDto[]>("videoeducations/getall");
  return response.data;
}

export const getVideoEducationsByInstructor = async (instructorId: number): Promise<VideoEducationDto[]> => {
  const response = await api.get<VideoEducationDto[]>(`videoeducations/getallbyinstructor/${instructorId}`);
  return response.data;
}

export const getVideoEducationById = async (id: number): Promise<VideoEducationDto> => {
  const response = await api.get<VideoEducationDto>(`videoeducations/${id}`);
  return response.data;
}

export const createVideoEducation = async (request: CreateVideoEducationRequest): Promise<VideoEducationDto> => {
  const response = await api.post<VideoEducationDto>("videoeducations", request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const updateVideoEducation = async (id: number, request: UpdateVideoEducationRequest): Promise<VideoEducationDto> => {
  const response = await api.put<VideoEducationDto>(`videoeducations?id=${id}`, request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const deleteVideoEducation = async (id: number): Promise<VideoEducationDto> => {
  const response = await api.delete<VideoEducationDto>(`videoeducations?id=${id}`);
  return response.data;
}
