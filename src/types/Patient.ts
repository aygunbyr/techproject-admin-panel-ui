import { Appointment } from "./Appointment";

export type Patient = {
  id: string;
  fullName: string;
  phone: string;
  citizenId: string;
  appointments?: Appointment[];
};
