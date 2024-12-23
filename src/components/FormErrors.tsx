import Alert from '@mui/material/Alert';

type FormErrorProps = {
  httpError?: string;
  validationErrors?: string[];
};

export default function FormErrors({
  httpError,
  validationErrors,
}: FormErrorProps) {
  return (
    <>
      {httpError && !validationErrors && (
        <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
          {httpError}
        </Alert>
      )}
      {validationErrors?.map((error, index) => (
        <Alert
          key={index}
          severity="error"
          sx={{ width: '100%', marginBottom: 2 }}
        >
          {error}
        </Alert>
      ))}
    </>
  );
}
