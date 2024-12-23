export class HttpProblemDetails {
  title: string;
  detail: string;
  status: number;
  type: string;
  Errors: ValidationExceptionModel[]
}

class ValidationExceptionModel {
  Property?: string;
  Errors: string[]
}