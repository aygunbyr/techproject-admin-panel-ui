import Typography from '@mui/material/Typography';
import UpdateCategoryForm from '@/features/categories/update-category/form';

export default function UpdateCategory(props: { params: { id: string }}) {
  const categoryId = parseInt(props.params.id)
  return <>
  <Typography variant="h4" mb={2}>
    Update Category
  </Typography>
  <UpdateCategoryForm id={categoryId} />
</>
}