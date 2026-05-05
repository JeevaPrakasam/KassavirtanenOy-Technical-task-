import React, { useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import TaskModal from "./components/TaskModal";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [editData, setEditData] = useState(null);
  const handleEdit = (task) => {
    setEditData(task);
    setOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header onCreate={() => setOpen(true)} />
      <Filters onFilter={setFilters} />

      <TaskModal isOpen={open} onClose={() => setOpen(false)}>
        <TaskForm
          onClose={() => setOpen(false)}
          editData={editData}
          setEditData={setEditData}
        />
      </TaskModal>

      <TaskList filters={filters} onEdit={handleEdit} />
    </div>
  );
}