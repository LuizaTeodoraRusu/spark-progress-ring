import React, { useState } from 'react';
import {UpdateProgressFormProps} from '../SparkProgressRing.types'

const UpdateProgressForm: React.FC<UpdateProgressFormProps> = ({
  currentValue,
  onUpdate,
  onCancel,
}) => {
  const [value, setValue] = useState(currentValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <label>
        Progres atins:
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </label>

      <button type="submit">Salvează</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Anulează
        </button>
      )}
    </form>
  );
};

export default UpdateProgressForm;
