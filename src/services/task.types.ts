export type Task = {
  title: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  duration: number;
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
  end_time: Date;
  duration: number;
};

export type TimeSlot = AddTimeSlot & {
  start_time: Date;
  end_time: Date;
  duration: number;
  task: Task;
};

export type TaskError = {
  title?: string;
  start_time?: string;
};
