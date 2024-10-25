export interface ToDo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  targetId: number;
}

export interface Target {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  todo: ToDo[];
}
