"use client";
import EntityList from "@/components/EntityList";
import { EventDto } from '@/models/events/EventDto';
import { getEvents, deleteEvent } from '@/services/events';

const columns = [
  { field: "id", headerName: "Event ID", flex: 1 },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "description", headerName: "Description", flex: 1},
  { field: "imageUrl", headerName: "Image URL", flex: 1},
  { field: "startDate", headerName: "Start Date", flex: 1},
  { field: "endDate", headerName: "End Date", flex: 1},
  { field: "applicationDeadline", headerName: "Application Deadline", flex: 1},
  { field: "participationText", headerName: "Participation Text", flex: 1},
  { field: "categoryName", headerName: "Category Name", flex: 1},
  { field: "createdDate", headerName: "Created Date", flex: 1 },
  { field: "updatedDate", headerName: "Updated Date", flex: 1 },
];

export default function EventsList() {
  return (
    <EntityList<EventDto>
      entityName="events"
      entityNameSingular="event"
      getItems={getEvents}
      deleteItem={deleteEvent}
      columns={columns}
    />
  );
}
