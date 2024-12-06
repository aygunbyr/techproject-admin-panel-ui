import Typography from '@mui/material/Typography';
import UpdateEventForm from '@/components/UpdateEventForm';


export default function UpdateEvent(props: { params: { id: string }}) {
  const eventId = props.params.id
  return <>
  <Typography variant="h4" mb={2}>
    Update Event
  </Typography>
  <UpdateEventForm id={eventId} />
</>
}