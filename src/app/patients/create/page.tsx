import Typography from "@mui/material/Typography";
import CreatePatientForm from "@/components/CreatePatientForm";

export default function CreateAppointment() {
  return (
    <>
      <Typography variant="h4" mb={2}>
        Create Patient
      </Typography>
      <CreatePatientForm />
    </>
  );
}
