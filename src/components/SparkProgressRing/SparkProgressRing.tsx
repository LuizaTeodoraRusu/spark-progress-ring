import React, { useEffect, useState } from "react";
import { SparkProgressRingProps } from "../SparkProgressRing.types";
import SparkProgressRingView from "./SparkProgressRingView";
import { differenceInCalendarDays } from "date-fns";

const SparkProgressRing: React.FC<SparkProgressRingProps> = ({
  label,
  currentValue,
  targetValue,
  unit = "",
  color = "#7f4ccd",
  deadline,
  size = 200,
}) => {
  const percentage = Math.min(currentValue / targetValue, 1);
  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);

  const [completedAnim, setCompletedAnim] = useState(false);

  useEffect(() => {
    if (percentage === 1) {
      setCompletedAnim(true);
      const timeout = setTimeout(() => setCompletedAnim(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [percentage]);

  let deadlineMessage: string | undefined = undefined;
  let isOverdue = false;

  if (deadline) {
    const deadlineDate = new Date(deadline);
    const daysRemaining = differenceInCalendarDays(deadlineDate, new Date());

    if (daysRemaining > 0) {
      deadlineMessage = `${daysRemaining} zile rămase`;
    } else if (daysRemaining === 0) {
      deadlineMessage = `Astăzi e deadline-ul!`;
    } else {
      isOverdue = true;
      deadlineMessage = `Depășit cu ${Math.abs(daysRemaining)} zile`;
    }
  }

  return (
    <div
      className={`spark-ring-wrapper ${completedAnim ? "completed-once" : ""}`}
      style={{ width: size, height: size }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {deadlineMessage && (
          <div
            style={{
              fontSize: "0.85rem",
              color: isOverdue ? "red" : "#555",
              marginBottom: "8px",
              fontWeight: 500,
            }}
          >
            {deadlineMessage}
          </div>
        )}

        <SparkProgressRingView
          size={size}
          radius={radius}
          circumference={circumference}
          strokeDashoffset={strokeDashoffset}
          currentValue={currentValue}
          targetValue={targetValue}
          unit={unit}
          label={label}
          color={color}
          percentage={percentage}
        />
      </div>
    </div>
  );
};

export default SparkProgressRing;
