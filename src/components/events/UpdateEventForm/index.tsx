"use client";
// General
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Form
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEventSchema, UpdateEventFormModel } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Services, types
import { getEventById, updateEvent } from '@/services/events';
import { EventDto } from '@/models/events/EventDto';
import { UpdateEventRequest } from '@/models/events/UpdateEventRequest';

type UpdateEventFormProps = {
  id: string;
}

export default function UpdateEventForm({id} : UpdateEventFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateEventFormModel>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      startDate: new Date(),
      endDate: new Date(),
      applicationDeadline: new Date(),
      participationText: "",
      categoryId: 0,
    },
  });

  const {
    data: event,
    error,
    isError,
    isLoading,
  } = useQuery<EventDto>({
    queryKey: ['event', id],
    queryFn: () => getEventById(id),
  });

  useEffect(() => {
    reset({
      title: event?.title,
      description: event?.description,
      imageUrl: event?.imageUrl,
      startDate: new Date(event?.startDate),
      endDate: new Date(event?.endDate),
      applicationDeadline: new Date(event?.applicationDeadline),
      participationText: event?.participationText,
      categoryId: event?.categoryId,
    });
  }, [event, reset])

  const updateEventMutation = useMutation<
    EventDto,
    unknown,
    UpdateEventRequest
  >({
    mutationFn: (updateEventRequest: UpdateEventRequest) =>
      updateEvent(id, updateEventRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/events");
    },
    onError: (error) => {
      console.log(error);
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.Errors?.map(error => error.Errors[0]) : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: UpdateEventFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    updateEventMutation.mutate(data as unknown as UpdateEventRequest);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Failed fetching event. Error: {error.message}</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {Array.isArray(serverSideErrors) && serverSideErrors?.map((error, index) => (
        <Alert
          key={index}
          severity="error"
          sx={{ width: "100%", marginBottom: 2 }}
        >
          {error}
        </Alert>
      ))}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          variant="filled"
          label="Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Description"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Image URL"
          {...register("imageUrl")}
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
                  variant: "filled",
                  error: !!errors.startDate,
                  helperText: errors.startDate ? errors.startDate.message : "",
                  margin: "normal"
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
                  variant: "filled",
                  error: !!errors.endDate,
                  helperText: errors.endDate ? errors.endDate.message : "",
                  margin: "normal"
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
                  variant: "filled",
                  error: !!errors.applicationDeadline,
                  helperText: errors.applicationDeadline ? errors.applicationDeadline.message : "",
                  margin: "normal",
                },
              }}
            />
          )}
        />
        <TextField
          type="text"
          variant="filled"
          label="ParticipationText"
          {...register("participationText")}
          error={!!errors.participationText}
          helperText={errors.participationText?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          variant="filled"
          label="Category ID"
          {...register("categoryId", { valueAsNumber: true })}
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
          {isSubmitting ? "Submitting..." : "Update"}
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
