import React, { useState, useEffect } from "react";
import "./App.css";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));

    const taskList = querySnapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setTasks(taskList);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      await updateDoc(doc(db, "tasks", editIndex), {
        text: task,
      });
      setEditIndex(null);
    } else {
      await addDoc(collection(db, "tasks"), {
        text: task,
      });
    }

    setTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Task Manager</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              {t.text}

              <div>
                <button
                  onClick={() => {
                    setTask(t.text);
                    setEditIndex(t.id);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => deleteTask(t.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;