"use client";
// General
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateInstructorSchema, UpdateInstructorFormModel } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

// Services, types
import { getInstructorById, updateInstructor } from '@/services/instructors';
import { InstructorDto } from '@/models/instructors/InstructorDto';
import { UpdateInstructorRequest } from '@/models/instructors/UpdateInstructorRequest';


type UpdateInstructorFormProps = {
  id: string;
}

export default function UpdateInstructorForm({id} : UpdateInstructorFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateInstructorFormModel>({
    resolver: zodResolver(updateInstructorSchema),
    defaultValues: {
      name: "",
      about: "",
    },
  });

  const {
    data: instructor,
    error,
    isError,
    isLoading,
  } = useQuery<InstructorDto>({
    queryKey: ['instructor', id],
    queryFn: () => getInstructorById(id),
  });

  useEffect(() => {
    reset({
      name: instructor?.name,
      about: instructor?.about,
    });
  }, [instructor, reset])

  const updateInstructorMutation = useMutation<
    InstructorDto,
    unknown,
    UpdateInstructorRequest
  >({
    mutationFn: (updateInstructorRequest: UpdateInstructorRequest) =>
      updateInstructor(id, updateInstructorRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      router.push("/instructors");
    },
    onError: (error) => {
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.Errors?.map(error => error.Errors[0]) : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: UpdateInstructorFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    updateInstructorMutation.mutate(data as unknown as UpdateInstructorRequest);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Failed fetching instructor. Error: {error.message}</Typography>;
  }

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
          variant="filled"
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
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
          {isSubmitting ? "Submitting..." : "Update"}
        </Button>
      </Box>
    </>
  );
}
