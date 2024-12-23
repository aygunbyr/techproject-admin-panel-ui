import Typography from "@mui/material/Typography";
import CreateInstructorForm from '@/features/instructors/create-instructor/form';

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
