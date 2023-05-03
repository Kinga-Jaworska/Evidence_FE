export type Task = {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
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
  start_time: string;
  end_time: string;
  duration: number;
};

export type TimeSlot = AddTimeSlot & {
  start_time: string;
  end_time: string;
  duration: number;
  task: Task;
};
