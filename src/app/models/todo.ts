export interface Todo {
  id?: string;
  description: string;
  completed: boolean;
  priority?: 'high' | 'medium' | 'low' | 'default';
  date?: { seconds: number, nanoseconds: number };
}
