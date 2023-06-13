export type Task = {
  project_name: string;
  start_time: Date;
  duration: number; // CHANGED
};

export type FormTask = {
  project_name: string;
  description?: string;
  start_time: Date;
  duration: string;
};

export type ReadTask = Task & {
  id: number;
  slot_id: number;
};

export type GroupedTask = {
  [key: string]: ReadTask[];
};

export type AddTimeSlot = {
  start_time: Date;
  duration: number;
};

export type TimeSlot = AddTimeSlot & {
  start_time: Date;
  duration: number;
  task: Task;
};

export type TaskError = {
  project_name?: string;
  start_time?: string;
  duration?: string;
};
