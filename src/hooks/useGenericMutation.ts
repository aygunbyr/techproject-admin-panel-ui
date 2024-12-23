import { useState } from 'react';
import { AxiosError } from 'axios';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { HttpProblemDetails } from '@/api/dtos/http-problem-details';

interface UseGenericMutationProps<TDto, TRequest> {
  handler: (request: TRequest) => Promise<TDto>;
  queryKey: string[];
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useGenericMutation = <TDto, TRequest>({
  handler,
  queryKey,
  onSuccess,
  onError,
}: UseGenericMutationProps<TDto, TRequest>) => {
  const queryClient = new QueryClient();
  const [error, setError] = useState<string | undefined>(undefined);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const mutation = useMutation<TDto, AxiosError, TRequest>({
    mutationFn: (request: TRequest) => {
      setIsSubmitting(true);
      return handler(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if(onSuccess) {
        onSuccess();
      }
      setIsSubmitting(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const httpProblemDetails = error.response.data as HttpProblemDetails;
        setError(httpProblemDetails.title)
        const httpProblemDetailsValidationErrors =
          httpProblemDetails.Errors?.flatMap((entity) => entity.Errors) || [];
        if(Array.isArray(httpProblemDetailsValidationErrors)) {
          setValidationErrors(httpProblemDetailsValidationErrors);
        }
      }
      setIsSubmitting(false);

      if (onError) {
        onError(error);
      }
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    httpError: error,
    validationErrors,
    isSubmitting,
  };
};
