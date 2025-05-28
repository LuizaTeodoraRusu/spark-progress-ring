import React, { useState } from 'react';

export interface TaskData {
  label: string;
  unit: string;
  targetValue: number;
  deadline?: string;
}

interface TaskFormProps {
  onSubmit: (task: TaskData) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [label, setLabel] = useState('');
  const [unit, setUnit] = useState('');
  const [targetValue, setTargetValue] = useState(0);
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !unit || !targetValue) return;

    onSubmit({
      label,
      unit,
      targetValue,
      deadline: deadline || undefined,
    });

    setLabel('');
    setUnit('');
    setTargetValue(0);
    setDeadline('');
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <label>
        Nume Task:
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </label>

      <label>
        Unitate:
        <input
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
      </label>

      <label>
        Țintă:
        <input
          type="number"
          value={targetValue}
          onChange={(e) => setTargetValue(Number(e.target.value))}
          required
        />
      </label>

      <label>
        Deadline (opțional):
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>
    
      <button type="submit">Adaugă Task</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Anulează
        </button>
      )}
    </form>
  );
};

export default TaskForm;
