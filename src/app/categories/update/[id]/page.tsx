import Typography from '@mui/material/Typography';
import UpdateCategoryForm from '@/components/UpdateCategoryForm';


export default function UpdateCategory(props: { params: { id: string }}) {
  const categoryId = parseInt(props.params.id)
  return <>
  <Typography variant="h4" mb={2}>
    Update Category
  </Typography>
  <UpdateCategoryForm id={categoryId} />
</>
}