"use client";
// General
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCategorySchema, UpdateCategoryFormModel } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

// Services, types
import { getCategoryById, updateCategory } from '@/services/categories';
import { CategoryDto } from '@/models/categories/CategoryDto';
import { UpdateCategoryRequest } from '@/models/categories/UpdateCategoryRequest';


type UpdateCategoryFormProps = {
  id: number;
}

export default function UpdateCategoryForm({id} : UpdateCategoryFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryFormModel>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    data: category,
    error,
    isError,
    isLoading,
  } = useQuery<CategoryDto>({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
  });

  useEffect(() => {
    reset({
      name: category?.name,
    });
  }, [category, reset])

  const updateCategoryMutation = useMutation<
    CategoryDto,
    unknown,
    UpdateCategoryRequest
  >({
    mutationFn: (updateCategoryRequest: UpdateCategoryRequest) =>
      updateCategory(id, updateCategoryRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/categories");
    },
    onError: (error) => {
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.Errors?.map(error => error.Errors[0]) : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: UpdateCategoryFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    updateCategoryMutation.mutate(data as unknown as UpdateCategoryRequest);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Failed fetching category. Error: {error.message}</Typography>;
  }

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
          {isSubmitting ? "Submitting..." : "Update"}
        </Button>
      </Box>
    </>
  );
}
