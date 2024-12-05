"use client";
// General
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Form
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDoctorSchema, CreateDoctorFormModel, branches } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Services, types
import { createDoctor } from "@/services/apiService";
import { Doctor } from "@/types/Doctor";
import { CreateDoctorRequest } from "@/types/dtos/CreateDoctorRequest";
import { ServiceResult } from "@/types/ServiceResult";

export default function CreateDoctorForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateDoctorFormModel>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues: {
      name: "",
      branch: "General Practice",
    },
  });

  const createDoctorMutation = useMutation<
    ServiceResult<Doctor>,
    unknown,
    CreateDoctorRequest
  >({
    mutationFn: (createDoctorRequest: CreateDoctorRequest) =>
      createDoctor(createDoctorRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      router.push("/doctors");
    },
    onError: (error) => {
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.errorMessage : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: CreateDoctorFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    createDoctorMutation.mutate(data as unknown as CreateDoctorRequest);
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
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal" error={!!errors.branch}>
          <InputLabel>Branch Name</InputLabel>
          <Controller
            name="branch"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Branch Name">
                {branches.map((branch, index) => (
                  <MenuItem key={index} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.branch && (
            <Typography color="red">{errors.branch.message}</Typography>
          )}
        </FormControl>
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
