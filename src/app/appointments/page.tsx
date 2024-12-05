"use client";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/services/apiService";
import { Appointment } from "@/types/Appointment";
import { ServiceResult } from "@/types/ServiceResult";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "doctorBranch", headerName: "Doctor's Branch", flex: 1 },
  { field: "doctorName", headerName: "Doctor's Name", flex: 1 },
  { field: "patientName", headerName: "Patient's Name", flex: 1 },
  { field: "patientPhone", headerName: "Patient's Phone", flex: 1 },
  { field: "patientCitizenId", headerName: "Patient's Citizen ID", flex: 1 },
];

export default function AppointmentList() {
  const {
    data: result,
    error,
    isError,
    isLoading,
  } = useQuery<ServiceResult<Appointment[]>>({
    queryKey: ["appointments"],
    queryFn: getAppointments,
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
        Appointment List
      </Typography>
      <DataGrid
        rows={result?.data || []}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </>
  );
}
