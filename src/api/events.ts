import api from './index';
import { CreateEventRequest } from './dtos/events/CreateEventRequest'; 
import { EventDto } from './dtos/events/EventDto'; 
import { UpdateEventRequest } from './dtos/events/UpdateEventRequest'; 

export const getEvents = async (): Promise<EventDto[]> => {
  const response = await api.get<EventDto[]>("events");
  return response.data;
}

export const getEventById = async (id: string): Promise<EventDto> => {
  const response = await api.get<EventDto>(`events/${id}`);
  return response.data;
}

export const createEvent = async (request: CreateEventRequest): Promise<EventDto> => {
  const response = await api.post<EventDto>("events", request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const updateEvent = async (id: string, request: UpdateEventRequest): Promise<EventDto> => {
  const response = await api.put<EventDto>(`events?id=${id}`, request, {
    headers: {"Content-Type": "application/json",}
  });
  return response.data;
}

export const deleteEvent = async (id: string): Promise<EventDto> => {
  const response = await api.delete<EventDto>(`events?id=${id}`);
  return response.data;
}
