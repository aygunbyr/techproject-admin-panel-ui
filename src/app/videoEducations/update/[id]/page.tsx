import Typography from '@mui/material/Typography';
import UpdateVideoEducationForm from '@/components/videoEducations/UpdateVideoEducationForm';

export default function UpdateVideoEducation(props: { params: { id: string }}) {
  const videoEducationId = parseInt(props.params.id)
  return <>
  <Typography variant="h4" mb={2}>
    Update Video Education
  </Typography>
  <UpdateVideoEducationForm id={videoEducationId} />
</>
}