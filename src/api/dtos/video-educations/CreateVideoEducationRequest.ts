export class CreateVideoEducationRequest {
  title: string;
  description: string;
  totalHour: number;
  isCertified: boolean;
  level: number;
  imageUrl: string;
  instructorId: string;
  programmingLanguage: string;
}