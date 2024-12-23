import Typography from '@mui/material/Typography';
import UpdateEventForm from '@/features/events/update-event/form';


export default function UpdateEvent(props: { params: { id: string }}) {
  const eventId = props.params.id
  return <>
  <Typography variant="h4" mb={2}>
    Update Event
  </Typography>
  <UpdateEventForm id={eventId} />
</>
}