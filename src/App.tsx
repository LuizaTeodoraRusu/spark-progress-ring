import { useState, useEffect } from "react";
import "./App.css";
import SparkProgressRing from "./components/SparkProgressRing/SparkProgressRing";
import TaskForm, { TaskData } from "./components/TaskForm/TaskForm";
import UpdateProgressForm from "./components/UpdateProgressForm/UpdateProgressForm";

function App() {
  const [tasks, setTasks] = useState<(TaskData & { currentValue: number })[]>(
    () => {
      const stored = sessionStorage.getItem("spark_tasks");
      return stored ? JSON.parse(stored) : [];
    }
  );
  useEffect(() => {
    sessionStorage.setItem("spark_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddTask = (task: TaskData) => {
    setTasks([...tasks, { ...task, currentValue: 0 }]);
    setShowForm(false);
  };

  const handleUpdateTask = (index: number, newValue: number) => {
    const updated = [...tasks];
    updated[index].currentValue = newValue;
    setTasks(updated);
    setEditingIndex(null);
  };

  return (
    <div className="container">
      <h2>Spark Progress Tracker</h2>
      <button onClick={() => setShowForm(true)}>Adaugă Task</button>

      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          marginTop: 40,
          alignItems: "center",
        }}
      >
        {tasks.map((task, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <SparkProgressRing
              label={task.label}
              currentValue={task.currentValue}
              targetValue={task.targetValue}
              unit={task.unit}
              deadline={task.deadline}
              size={180}
              color="#ff5f00"
            />
            <button onClick={() => setEditingIndex(index)}>
              Actualizează progresul
            </button>

            {editingIndex === index && (
              <UpdateProgressForm
                currentValue={task.currentValue}
                onUpdate={(val) => handleUpdateTask(index, val)}
                onCancel={() => setEditingIndex(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
