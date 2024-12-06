"use client";
// General
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Form
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVideoEducationSchema, CreateVideoEducationFormModel } from "./schema";

// Material UI
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Services, types
import { createVideoEducation } from '@/services/videoEducations';
import { VideoEducationDto } from '@/models/videoEducations/VideoEducationDto';
import { CreateVideoEducationRequest } from '@/models/videoEducations/CreateVideoEducationRequest';

export default function CreateVideoEducationForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateVideoEducationFormModel>({
    resolver: zodResolver(createVideoEducationSchema),
    defaultValues: {
      title: "",
      description: "",
      totalHour: 0,
      isCertified: false,
      level: 0,
      imageUrl: "",
      instructorId: "",
      programmingLanguage: "",
    },
  });

  const createVideoEducationMutation = useMutation<
    VideoEducationDto,
    unknown,
    CreateVideoEducationRequest
  >({
    mutationFn: (createVideoEducationRequest: CreateVideoEducationRequest) =>
      createVideoEducation(createVideoEducationRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videoEducations"] });
      router.push("/videoEducations");
    },
    onError: (error) => {
      console.log(error);
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.Errors?.map(error => error.Errors[0]) : []
      );
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: CreateVideoEducationFormModel) => {
    setIsSubmitting(true);
    setServerSideErrors([]);

    createVideoEducationMutation.mutate(data as unknown as CreateVideoEducationRequest);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          label="Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Description"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          variant="filled"
          label="Total Hour"
          {...register("totalHour", { valueAsNumber: true })}
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
                value={field.value ? "true" : "false"}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <TextField
          type="number"
          variant="filled"
          label="Level"
          {...register("level", { valueAsNumber: true })}
          error={!!errors.level}
          helperText={errors.level?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Image URL"
          {...register("imageUrl")}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Instructor ID"
          {...register("instructorId")}
          error={!!errors.instructorId}
          helperText={errors.instructorId?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          variant="filled"
          label="Programming Language"
          {...register("programmingLanguage")}
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
          {isSubmitting ? "Submitting..." : "Create"}
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
