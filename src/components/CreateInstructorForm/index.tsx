"use client";
// General
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInstructorSchema, CreateInstructorFormModel } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Services, types
import { createInstructor } from '@/services/instructors';
import { InstructorDto } from '@/models/instructors/InstructorDto';
import { CreateInstructorRequest } from '@/models/instructors/CreateInstructorRequest';

export default function CreateInstructorForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInstructorFormModel>({
    resolver: zodResolver(createInstructorSchema),
    defaultValues: {
      name: "",
      about: "",
    },
  });

  const createInstructorMutation = useMutation<
    InstructorDto,
    unknown,
    CreateInstructorRequest
  >({
    mutationFn: (createInstructorRequest: CreateInstructorRequest) =>
      createInstructor(createInstructorRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      router.push("/instructors");
    },
    onError: (error) => {
      console.log(error);
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.Errors?.map(error => error.Errors[0]) : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: CreateInstructorFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    createInstructorMutation.mutate(data as unknown as CreateInstructorRequest);
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
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          label="About"
          {...register("about")}
          error={!!errors.about}
          helperText={errors.about?.message}
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
