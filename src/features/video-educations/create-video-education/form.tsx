'use client';
// General
import { useRouter } from 'next/navigation';

// Form
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createVideoEducationSchema,
  CreateVideoEducationFormModel,
} from './schema';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Services, types
import { createVideoEducation } from '@/api/video-educations';
import { VideoEducationDto } from '@/api/dtos/video-educations/VideoEducationDto';
import { CreateVideoEducationRequest } from '@/api/dtos/video-educations/CreateVideoEducationRequest';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import { Mapper } from '@/lib/mapper';
import { levels } from '../constants';
import FormErrors from '@/components/FormErrors';

export default function CreateVideoEducationForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateVideoEducationFormModel>({
    resolver: zodResolver(createVideoEducationSchema),
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

  const { mutate, httpError, validationErrors, isSubmitting } =
    useGenericMutation<VideoEducationDto, CreateVideoEducationRequest>({
      handler: (request) => createVideoEducation(request),
      queryKey: ['video-educations'],
      onSuccess: () => router.push('/video-educations'),
    });

  const onSubmit = (data: CreateVideoEducationFormModel) => {
    const request = Mapper.mapFromDto(CreateVideoEducationRequest, data);
    mutate(request);
  };

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
          {isSubmitting ? 'Submitting...' : 'Create'}
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
