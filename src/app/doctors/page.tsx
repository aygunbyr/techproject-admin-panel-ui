"use client";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/apiService";
import { Doctor } from "@/types/Doctor";
import { ServiceResult } from "@/types/ServiceResult";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Full Name", flex: 2 },
  { field: "branch", headerName: "Branch", flex: 2 },
];

export default function DoctorList() {
  const {
    data: result,
    error,
    isError,
    isLoading,
  } = useQuery<ServiceResult<Doctor[]>>({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>An error has occurred: {error.message}</Typography>;
  }

  return (
    <>
      <Typography variant="h4" mb={2}>
        Doctor List
      </Typography>
      <DataGrid
        rows={result?.data || []}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </>
  );
}
