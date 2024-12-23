'use client';
// General
import { useRouter } from 'next/navigation';

// Form
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEventSchema, CreateEventFormModel } from './schema';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Services, types
import { createEvent } from '@/api/events';
import { EventDto } from '@/api/dtos/events/EventDto';
import { CreateEventRequest } from '@/api/dtos/events/CreateEventRequest';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import { Mapper } from '@/lib/mapper';
import FormErrors from '@/components/FormErrors';

export default function CreateEventForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEventFormModel>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      startDate: new Date(),
      endDate: new Date(),
      applicationDeadline: new Date(),
      participationText: '',
      categoryId: 0,
    },
  });

  const { mutate, httpError, validationErrors, isSubmitting } =
    useGenericMutation<EventDto, CreateEventRequest>({
      handler: (request) => createEvent(request),
      queryKey: ['events'],
      onSuccess: () => router.push('/events'),
    });

  const onSubmit = (data: CreateEventFormModel) => {
    const request = Mapper.mapFromDto(CreateEventRequest, data);
    mutate(request);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormErrors httpError={httpError} validationErrors={validationErrors} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          variant="filled"
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Description"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Image URL"
          {...register('imageUrl')}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl?.message}
          fullWidth
          margin="normal"
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              value={field.value}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'filled',
                  error: !!errors.startDate,
                  helperText: errors.startDate ? errors.startDate.message : '',
                  margin: 'normal',
                },
              }}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="End Date"
              value={field.value}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'filled',
                  error: !!errors.endDate,
                  helperText: errors.endDate ? errors.endDate.message : '',
                  margin: 'normal',
                },
              }}
            />
          )}
        />
        <Controller
          name="applicationDeadline"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Application Deadline"
              value={field.value}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'filled',
                  error: !!errors.applicationDeadline,
                  helperText: errors.applicationDeadline
                    ? errors.applicationDeadline.message
                    : '',
                  margin: 'normal',
                },
              }}
            />
          )}
        />
        <TextField
          type="text"
          variant="filled"
          label="ParticipationText"
          {...register('participationText')}
          error={!!errors.participationText}
          helperText={errors.participationText?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          variant="filled"
          label="Category ID"
          {...register('categoryId', { valueAsNumber: true })}
          error={!!errors.categoryId}
          helperText={errors.categoryId?.message}
          fullWidth
          margin="normal"
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {isSubmitting ? 'Submitting...' : 'Create'}
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
