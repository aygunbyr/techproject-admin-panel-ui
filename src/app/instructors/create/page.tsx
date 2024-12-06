import Typography from "@mui/material/Typography";
import CreateInstructorForm from '@/components/instructors/CreateInstructorForm';

export default function CreateInstructor() {
  return (
    <>
      <Typography variant="h4" mb={2}>
        Create Instructor
      </Typography>
      <CreateInstructorForm />
    </>
  );
}
