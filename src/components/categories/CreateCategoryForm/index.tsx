"use client";
// General
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, CreateCategoryFormModel } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Services, types
import { createCategory } from '@/services/categories';
import { CategoryDto } from '@/models/categories/CategoryDto';
import { CreateCategoryRequest } from '@/models/categories/CreateCategoryRequest';

export default function CreateCategoryForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryFormModel>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const createCategoryMutation = useMutation<
    CategoryDto,
    unknown,
    CreateCategoryRequest
  >({
    mutationFn: (createCategoryRequest: CreateCategoryRequest) =>
      createCategory(createCategoryRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/categories");
    },
    onError: (error) => {
      console.log(error);
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.Errors?.map(error => error.Errors[0]) : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: CreateCategoryFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    createCategoryMutation.mutate(data as unknown as CreateCategoryRequest);
  };

  return (
    <>
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
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
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
