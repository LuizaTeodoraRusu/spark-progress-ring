import React from "react";
import "./SparkProgressRing.css";
import { ViewProps } from "../SparkProgressRing.types";

const SparkProgressRingView: React.FC<ViewProps> = ({
  size,
  radius,
  circumference,
  strokeDashoffset,
  currentValue,
  targetValue,
  unit,
  label,
  color,
  deadlineMessage,
  isOverdue,
  percentage,
}) => {
  return (
    <div className="spark-ring-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="spark-ring">
        <circle
          className="ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#7f4ccd"
          strokeWidth="10"
          fill="none"
        />
        <circle
          className="ring-fg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        <circle
          className={`ring-fg ${percentage === 1 ? "ring-completed" : ""}`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="spark-ring-center">
        <div className="spark-ring-value">
          {currentValue} / {targetValue} {unit}
        </div>
        <div className="spark-ring-label">{label}</div>
        {deadlineMessage && (
          <div
            className="spark-ring-deadline"
            style={{ color: isOverdue ? "red" : "#666" }}
          >
            {deadlineMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SparkProgressRingView;
