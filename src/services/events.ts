import api from './api';
import { CreateEventRequest } from '@/models/events/CreateEventRequest';
import { EventDto } from '@/models/events/EventDto';
import { UpdateEventRequest } from '@/models/events/UpdateEventRequest';

export const getEvents = async (): Promise<EventDto[]> => {
  const response = await api.get<EventDto[]>("events");
  return response.data;
}

export const getEventById = async (id: number): Promise<EventDto> => {
  const response = await api.get<EventDto>(`events/${id}`);
  return response.data;
}

export const createEvent = async (request: CreateEventRequest): Promise<EventDto> => {
  const response = await api.post<EventDto>("events", request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const updateEvent = async (id: number, request: UpdateEventRequest): Promise<EventDto> => {
  const response = await api.put<EventDto>(`events?id=${id}`, request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const deleteEvent = async (id: number): Promise<EventDto> => {
  const response = await api.delete<EventDto>(`events?id=${id}`);
  return response.data;
}
