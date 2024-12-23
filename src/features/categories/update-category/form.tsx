'use client';
// General
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCategorySchema, UpdateCategoryFormModel } from './schema';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Services, types
import { getCategoryById, updateCategory } from '@/api/categories';
import { CategoryDto } from '@/api/dtos/categories/CategoryDto';
import { UpdateCategoryRequest } from '@/api/dtos/categories/UpdateCategoryRequest';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import { Mapper } from '@/lib/mapper';
import FormErrors from '@/components/FormErrors';

type UpdateCategoryFormProps = {
  id: number;
};

export default function UpdateCategoryForm({ id }: UpdateCategoryFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryFormModel>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: '',
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
    const updateDto = Mapper.mapFromDto(UpdateCategoryRequest, category);
    reset({
      ...updateDto,
    });
  }, [category, reset]);

  const { mutate, httpError, validationErrors, isSubmitting } =
    useGenericMutation<CategoryDto, UpdateCategoryRequest>({
      handler: (request) => updateCategory(id, request),
      queryKey: ['categories'],
      onSuccess: () => router.push('/categories'),
    });

  const onSubmit = (data: UpdateCategoryFormModel) => {
    const request = Mapper.mapFromDto(UpdateCategoryRequest, data);
    mutate(request);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return (
      <Typography>Failed fetching category. Error: {error.message}</Typography>
    );
  }

  return (
    <>
      <FormErrors httpError={httpError} validationErrors={validationErrors} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          variant="filled"
          label="Name"
          {...register('name')}
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
          {isSubmitting ? 'Submitting...' : 'Update'}
        </Button>
      </Box>
    </>
  );
}
