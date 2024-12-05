"use client";
// General
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatISO } from "date-fns";
import { AxiosError } from "axios";

// Form
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAppointmentSchema, CreateAppointmentFormModel } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Services, types
import { createAppointment } from "@/services/apiService";
import { Appointment } from "@/types/Appointment";
import { CreateAppointmentRequest } from "@/types/dtos/CreateAppointmentRequest";
import { ServiceResult } from "@/types/ServiceResult";

export default function CreateAppointmentForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAppointmentFormModel>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      date: new Date(),
      patientId: "",
      doctorId: 0,
    },
  });

  const createAppointmentMutation = useMutation<
    ServiceResult<Appointment>,
    unknown,
    CreateAppointmentRequest
  >({
    mutationFn: (createAppointmentRequest: CreateAppointmentRequest) =>
      createAppointment(createAppointmentRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.push("/appointments");
    },
    onError: (error) => {
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.errorMessage : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: CreateAppointmentFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    const formattedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        return [key, value instanceof Date ? formatISO(value) : value];
      })
    );

    createAppointmentMutation.mutate(
      formattedData as unknown as CreateAppointmentRequest
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {serverSideErrors.map((error, index) => (
        <Alert
          key={index}
          severity="error"
          sx={{ width: "100%", marginBottom: 2 }}
        >
          {error}
        </Alert>
      ))}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Appointment Date"
              value={field.value}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  error: !!errors.date,
                  helperText: errors.date ? errors.date.message : "",
                },
              }}
            />
          )}
        />
        <TextField
          type="text"
          label="Patient ID"
          {...register("patientId")}
          error={!!errors.patientId}
          helperText={errors.patientId?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          label="Doctor ID"
          {...register("doctorId", { valueAsNumber: true })}
          error={!!errors.doctorId}
          helperText={errors.doctorId?.message}
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
          {isSubmitting ? "Submitting..." : "Create"}
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
