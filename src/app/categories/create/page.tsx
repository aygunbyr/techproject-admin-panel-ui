import Typography from "@mui/material/Typography";
import CreateCategoryForm from '@/components/CreateCategoryForm';

export default function CreateDoctor() {
  return (
    <>
      <Typography variant="h4" mb={2}>
        Create Category
      </Typography>
      <CreateCategoryForm />
    </>
  );
}
