import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTasks } from "../hook/useTasks";
import "../styles/tasks.scss";

export default function Tasks() {
  const auth = useContext(AuthContext);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  if (!auth) return null;

  const { user, logout } = auth;
  const { tasks, addTask, deleteTask, toggleTask, editTask } = useTasks(user);

  return (
    <div className="tasks-container">
      <div className="tasks-card">

        {/* HEADER */}
        <div className="d-flex justify-content-between mb-3">
          <h3>Mis tareas</h3>
          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>

        {/* CREAR */}
        <div className="input-group mb-3">
          <input
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nueva tarea..."
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              addTask(text);
              setText("");
            }}
          >
            Agregar
          </button>
        </div>

        {/* LISTA */}
        {tasks.map((task) => (
          <div key={task.id} className="task-item">

            {/* IZQUIERDA */}
            <div className="left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id, task.completed)}
              />

              {editingId === task.id ? (
                <input
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
              )}
            </div>

            {/* ACCIONES */}
            <div className="actions">
              {editingId === task.id ? (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    editTask(task.id, editText);
                    setEditingId(null);
                  }}
                >
                  💾
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setEditingId(task.id);
                    setEditText(task.text);
                  }}
                >
                  ✏️
                </button>
              )}

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(task.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}