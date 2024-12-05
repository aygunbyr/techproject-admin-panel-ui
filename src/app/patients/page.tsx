"use client";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/services/apiService";
import { Patient } from "@/types/Patient";
import { ServiceResult } from "@/types/ServiceResult";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "fullName", headerName: "Full Name", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 1 },
  { field: "citizenId", headerName: "Citizen ID", flex: 1 },
];

export default function PatientList() {
  const {
    data: result,
    error,
    isError,
    isLoading,
  } = useQuery<ServiceResult<Patient[]>>({
    queryKey: ["patients"],
    queryFn: getPatients,
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
        Patient List
      </Typography>
      <DataGrid
        rows={result?.data || []}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </>
  );
}
