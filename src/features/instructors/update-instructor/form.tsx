'use client';
// General
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

// Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateInstructorSchema, UpdateInstructorFormModel } from './schema';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Services, types
import { getInstructorById, updateInstructor } from '@/api/instructors';
import { InstructorDto } from '@/api/dtos/instructors/InstructorDto';
import { UpdateInstructorRequest } from '@/api/dtos/instructors/UpdateInstructorRequest';
import { Mapper } from '@/lib/mapper';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import FormErrors from '@/components/FormErrors';

type UpdateInstructorFormProps = {
  id: string;
};

export default function UpdateInstructorForm({
  id,
}: UpdateInstructorFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateInstructorFormModel>({
    resolver: zodResolver(updateInstructorSchema),
    defaultValues: {
      name: '',
      about: '',
    },
  });

  const {
    data: instructor,
    error,
    isError,
    isLoading,
  } = useQuery<InstructorDto>({
    queryKey: ['instructors', id],
    queryFn: () => getInstructorById(id),
  });

  useEffect(() => {
    const updateDto = Mapper.mapFromDto(UpdateInstructorRequest, instructor);
    reset({
      ...updateDto,
    });
  }, [instructor, reset]);

  const { mutate, httpError, validationErrors, isSubmitting } =
    useGenericMutation<InstructorDto, UpdateInstructorRequest>({
      handler: (request) => updateInstructor(id, request),
      queryKey: ['instructors'],
      onSuccess: () => router.push('/instructors'),
    });

  const onSubmit = (data: UpdateInstructorFormModel) => {
    const request = Mapper.mapFromDto(UpdateInstructorRequest, data);
    mutate(request);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return (
      <Typography>
        Failed fetching instructor. Error: {error.message}
      </Typography>
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
        <TextField
          type="text"
          variant="filled"
          label="About"
          {...register('about')}
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
          {isSubmitting ? 'Submitting...' : 'Update'}
        </Button>
      </Box>
    </>
  );
}
