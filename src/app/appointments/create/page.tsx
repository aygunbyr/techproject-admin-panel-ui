import Typography from "@mui/material/Typography";
import CreateAppointmentForm from "@/components/CreateAppointmentForm";

export default function CreateAppointment() {
  return (
    <>
      <Typography variant="h4" mb={2}>
        Create Appointment
      </Typography>
      <CreateAppointmentForm />
    </>
  );
}
