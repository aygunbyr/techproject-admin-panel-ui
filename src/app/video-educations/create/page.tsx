import Typography from "@mui/material/Typography";
import CreateVideoEducationForm from '@/features/video-educations/create-video-education/form';

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
