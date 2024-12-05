"use client";
// General
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPatientSchema, CreatePatientFormModel } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Services, types
import { createPatient } from "@/services/apiService";
import { Patient } from "@/types/Patient";
import { CreatePatientRequest } from "@/types/dtos/CreatePatientRequest";
import { ServiceResult } from "@/types/ServiceResult";

export default function CreatePatientForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePatientFormModel>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      citizenId: "",
    },
  });

  const createPatientMutation = useMutation<
    ServiceResult<Patient>,
    unknown,
    CreatePatientRequest
  >({
    mutationFn: (createPatientRequest: CreatePatientRequest) =>
      createPatient(createPatientRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      router.push("/patients");
    },
    onError: (error) => {
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.errorMessage : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: CreatePatientFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    createPatientMutation.mutate(data as unknown as CreatePatientRequest);
  };

  return (
    <>
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
        <TextField
          type="text"
          label="Full Name"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          label="Phone"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          label="Citizen ID"
          {...register("citizenId")}
          error={!!errors.citizenId}
          helperText={errors.citizenId?.message}
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
    </>
  );
}
