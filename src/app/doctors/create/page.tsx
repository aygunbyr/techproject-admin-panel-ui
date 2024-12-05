import Typography from "@mui/material/Typography";
import CreateDoctorForm from "@/components/CreateDoctorForm";

export default function CreateDoctor() {
  return (
    <>
      <Typography variant="h4" mb={2}>
        Create Doctor
      </Typography>
      <CreateDoctorForm />
    </>
  );
}
