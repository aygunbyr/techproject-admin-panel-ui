"use client";
import EntityList from "@/components/EntityList";
import {VideoEducationDto} from "@/models/videoEducations/VideoEducationDto";
import {getVideoEducations, deleteVideoEducation} from "@/services/videoEducations";

const columns = [
  { field: "id", headerName: "Video Education ID", flex: 1 },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "description", headerName: "Description", flex: 1},
  { field: "totalHour", headerName: "Total Hour", flex: 1 },
  { 
    field: "isCertified", 
    headerName: "Is Certified", 
    flex: 1,
    type: "boolean",
    renderCell: (params) => (params.value ? "Yes" : "No"),
  },
  { field: "level", headerName: "Level", flex: 1 },
  { field: "imageUrl", headerName: "Image URL", flex: 1},
  { field: "instructorName", headerName: "Instructor Name", flex: 1 },
  { field: "programmingLanguage", headerName: "Programming Language", flex: 1},
  { field: "createdDate", headerName: "Created Date", flex: 1 },
  { field: "updatedDate", headerName: "Updated Date", flex: 1 },
];

export default function VideoEducationsList() {
  return (
    <EntityList<VideoEducationDto>
      entityName="videoEducations"
      entityNameSingular="video education"
      getItems={getVideoEducations}
      deleteItem={deleteVideoEducation}
      // @ts-expect-error Material UI related problem
      columns={columns}
    />
  );
}
