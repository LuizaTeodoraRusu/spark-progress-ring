export interface SparkProgressRingProps {
  label: string;
  currentValue: number;
  targetValue: number;
  unit?: string;
  color?: string;
  deadline?: string;
  size?: number;
}

export interface ViewProps {
  size: number;
  radius: number;
  circumference: number;
  strokeDashoffset: number;
  currentValue: number;
  targetValue: number;
  unit: string;
  label: string;
  color: string;
  deadlineMessage?: string;
  isOverdue?: boolean;
  percentage: number;
}

export interface UpdateProgressFormProps {
  currentValue: number;
  onUpdate: (newValue: number) => void;
  onCancel?: () => void;
}
