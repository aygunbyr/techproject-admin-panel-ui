'use client';
// General
import { useRouter } from 'next/navigation';

// Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategorySchema, CreateCategoryFormModel } from './schema';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Services, types
import { createCategory } from '@/api/categories';
import { CategoryDto } from '@/api/dtos/categories/CategoryDto';
import { CreateCategoryRequest } from '@/api/dtos/categories/CreateCategoryRequest';
import { Mapper } from '@/lib/mapper';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import FormErrors from '@/components/FormErrors';

export default function CreateCategoryForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryFormModel>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate, httpError, validationErrors, isSubmitting } =
    useGenericMutation<CategoryDto, CreateCategoryRequest>({
      handler: (request) => createCategory(request),
      queryKey: ['categories'],
      onSuccess: () => router.push('/categories'),
    });

  const onSubmit = (data: CreateCategoryFormModel) => {
    const request = Mapper.mapFromDto(CreateCategoryRequest, data);
    mutate(request);
  };

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
          {isSubmitting ? 'Submitting...' : 'Create'}
        </Button>
      </Box>
    </>
  );
}
