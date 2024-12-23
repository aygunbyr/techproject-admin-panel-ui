"use client";
import EntityList from "@/components/EntityList";
import { InstructorDto } from '@/api/dtos/instructors/InstructorDto'; 
import { getInstructors, deleteInstructor } from '@/api/instructors';

const columns = [
  { field: "id", headerName: "Instructor ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "about", headerName: "About", flex: 1},
  { field: "createdDate", headerName: "Created Date", flex: 1 },
  { field: "updatedDate", headerName: "Updated Date", flex: 1 },
];

export default function EventsList() {
  return (
    <EntityList<InstructorDto, string>
      entityName="instructors"
      entityNameSingular="instructor"
      getItems={getInstructors}
      deleteItem={deleteInstructor}
      columns={columns}
    />
  );
}
