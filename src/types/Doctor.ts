import { Appointment } from "./Appointment";

export type Doctor = {
  id: number;
  name: string;
  branch: string;
  appointments?: Appointment[];
};
