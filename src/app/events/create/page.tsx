import Typography from "@mui/material/Typography";
import CreateEventForm from '@/components/events/CreateEventForm';

export default function CreateEvent() {
  return (
    <>
      <Typography variant="h4" mb={2}>
        Create Event
      </Typography>
      <CreateEventForm />
    </>
  );
}
