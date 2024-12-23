'use client';
// General
import { useRouter } from 'next/navigation';

// Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInstructorSchema, CreateInstructorFormModel } from './schema';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Services, types
import { createInstructor } from '@/api/instructors';
import { InstructorDto } from '@/api/dtos/instructors/InstructorDto';
import { CreateInstructorRequest } from '@/api/dtos/instructors/CreateInstructorRequest';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import { Mapper } from '@/lib/mapper';
import FormErrors from '@/components/FormErrors';

export default function CreateInstructorForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInstructorFormModel>({
    resolver: zodResolver(createInstructorSchema),
    defaultValues: {
      name: '',
      about: '',
    },
  });

  const { mutate, httpError, validationErrors, isSubmitting } =
    useGenericMutation<InstructorDto, CreateInstructorRequest>({
      handler: (request) => createInstructor(request),
      queryKey: ['instructors'],
      onSuccess: () => router.push('/instructors'),
    });

  const onSubmit = (data: CreateInstructorFormModel) => {
    const request = Mapper.mapFromDto(CreateInstructorRequest, data);
    mutate(request);
  };

  return (
    <>
      <FormErrors httpError={httpError} validationErrors={validationErrors} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          variant="filled"
          label="Full Name"
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
          {isSubmitting ? 'Submitting...' : 'Create'}
        </Button>
      </Box>
    </>
  );
}
