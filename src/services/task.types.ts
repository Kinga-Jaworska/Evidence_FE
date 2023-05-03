export type ReadTask = {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  duration: number;
  id: number;
  slot_id: number;
};

export type GroupedTask = {
  [key: string]: ReadTask[];
};
