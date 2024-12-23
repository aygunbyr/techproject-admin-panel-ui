'use client';
// General
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

// Form
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateVideoEducationSchema,
  UpdateVideoEducationFormModel,
} from './schema';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Services, types
import {
  getVideoEducationById,
  updateVideoEducation,
} from '@/api/video-educations';
import { VideoEducationDto } from '@/api/dtos/video-educations/VideoEducationDto';
import { UpdateVideoEducationRequest } from '@/api/dtos/video-educations/UpdateVideoEducationRequest';
import { Mapper } from '@/lib/mapper';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import { levels } from '../constants';
import FormErrors from '@/components/FormErrors';

type UpdateVideoEducationFormProps = {
  id: number;
};

export default function UpdateVideoEducationForm({
  id,
}: UpdateVideoEducationFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateVideoEducationFormModel>({
    resolver: zodResolver(updateVideoEducationSchema),
    defaultValues: {
      title: '',
      description: '',
      totalHour: 0,
      isCertified: false,
      level: 0,
      imageUrl: '',
      instructorId: '',
      programmingLanguage: '',
    },
  });

  const {
    data: videoEducation,
    error,
    isError,
    isLoading,
  } = useQuery<VideoEducationDto>({
    queryKey: ['video-educations', id],
    queryFn: () => getVideoEducationById(id),
  });

  useEffect(() => {
    if (!videoEducation) return;
    const updateDto = Mapper.mapFromDto(
      UpdateVideoEducationRequest,
      videoEducation
    );
    reset({
      ...updateDto,
    });
  }, [videoEducation, reset]);

  const { mutate, httpError, validationErrors, isSubmitting } =
    useGenericMutation<VideoEducationDto, UpdateVideoEducationRequest>({
      handler: (request) => updateVideoEducation(id, request),
      queryKey: ['video-educations'],
      onSuccess: () => router.push('/video-educations'),
    });

  const onSubmit = (data: UpdateVideoEducationFormModel) => {
    const request = Mapper.mapFromDto(UpdateVideoEducationRequest, data);
    mutate(request);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return (
      <Typography>
        Failed fetching video education. Error: {error.message}
      </Typography>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormErrors httpError={httpError} validationErrors={validationErrors} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          variant="filled"
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Description"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          variant="filled"
          label="Total Hour"
          {...register('totalHour', { valueAsNumber: true })}
          error={!!errors.totalHour}
          helperText={errors.totalHour?.message}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel id="isCertified-label">Is Certified</InputLabel>
          <Controller
            name="isCertified"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Select
                labelId="isCertified-label"
                {...field}
                value={field.value ? 'true' : 'false'}
                onChange={(e) => field.onChange(e.target.value === 'true')}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel id="level-label">Level</InputLabel>
          <Controller
            name="level"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Select
                labelId="level-label"
                {...field}
                value={field.value} // Değer doğrudan number olarak kullanılıyor
                onChange={(e) => field.onChange(Number(e.target.value))} // Değer number'a çevriliyor
              >
                {Object.entries(levels).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <TextField
          type="text"
          variant="filled"
          label="Image URL"
          {...register('imageUrl')}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Instructor ID"
          {...register('instructorId')}
          error={!!errors.instructorId}
          helperText={errors.instructorId?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Programming Language"
          {...register('programmingLanguage')}
          error={!!errors.programmingLanguage}
          helperText={errors.programmingLanguage?.message}
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
    </LocalizationProvider>
  );
}
