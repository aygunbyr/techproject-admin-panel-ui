import Typography from "@mui/material/Typography";
import CreateVideoEducationForm from '@/components/videoEducations/CreateVideoEducationForm';

export default function CreateVideoEducation() {
  return (
    <>
      <Typography variant="h4" mb={2}>
        Create Video Education
      </Typography>
      <CreateVideoEducationForm />
    </>
  );
}
