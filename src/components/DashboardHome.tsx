"use client";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  getAppointments,
  getDoctors,
  getPatients,
} from "@/services/apiService";
import { Appointment } from "@/types/Appointment";
import { Doctor } from "@/types/Doctor";
import { Patient } from "@/types/Patient";
import { ServiceResult } from "@/types/ServiceResult";

function DashboardHome() {
  // Prefetch data
  const { isLoading: appointmentIsLoading, data: appointmentResult } = useQuery<
    ServiceResult<Appointment[]>
  >({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const { isLoading: doctorIsLoading, data: doctorResult } = useQuery<
    ServiceResult<Doctor[]>
  >({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const { isLoading: patientIsLoading, data: patientResult } = useQuery<
    ServiceResult<Patient[]>
  >({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const getCounts = useCallback(() => {
    const appointmentCount = Array.isArray(appointmentResult?.data)
      ? appointmentResult.data.length
      : 0;
    const doctorCount = Array.isArray(doctorResult?.data)
      ? doctorResult.data.length
      : 0;
    const patientCount = Array.isArray(patientResult?.data)
      ? patientResult.data.length
      : 0;
    return { appointmentCount, doctorCount, patientCount };
  }, [appointmentResult, doctorResult, patientResult]);

  const { appointmentCount, doctorCount, patientCount } = getCounts();

  if (appointmentIsLoading || doctorIsLoading || patientIsLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Doctors</Typography>
            <Typography variant="h2">{doctorCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Patients</Typography>
            <Typography variant="h2">{patientCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Appointments</Typography>
            <Typography variant="h2">{appointmentCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DashboardHome;
