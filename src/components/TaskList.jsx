import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/actions";

export default function TaskList({ filters, onEdit }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  useEffect(() => {
    let result = [...tasks];

    // 🔍 Search filter
    if (filters?.search) {
      result = result.filter(
        (task) =>
          task.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // 📁 Project filter
    if (filters?.project) {
      result = result.filter(
        (task) => task.project === filters.project
      );
    }

    // 👤 Assignee filter
    if (filters?.assignee) {
      result = result.filter(
        (task) => task.assignee === filters.assignee
      );
    }

    // 📌 Status filter
    if (filters?.status) {
      result = result.filter(
        (task) =>
          (task.status || "In Progress")
            .toLowerCase()
            .trim() === filters.status.toLowerCase().trim()
      );
    }

    // 🐞 Type filter
    if (filters?.type) {
      result = result.filter(
        (task) => task.taskType === filters.type
      );
    }

    setFilteredTasks(result);
  }, [tasks, filters]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">
        Tasks ({filteredTasks.length})
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-lg shadow p-4 border-l-4 ${task.taskType === "Bug" ? "border-red-500" : "border-green-500"
              }`}
          >
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">

                {/* Type Badge */}
                <span
                  className={`text-xs px-2 py-1 rounded text-white ${task.taskType === "Bug"
                    ? "bg-red-500"
                    : "bg-orange-400"
                    }`}
                >
                  {task.taskType || "Bug"}
                </span>

                {/* Status */}
                <span className="text-blue-500 text-sm font-medium">
                  {task.status || "In Progress"}
                </span>
              </div>

              {/* Icons */}
              <div className="flex gap-2 cursor-pointer">
                <span onClick={() => onEdit(task)}>✏️</span>
                <span
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this task?")) {
                      dispatch(deleteTask(task.id));
                    }
                  }}
                >
                  🗑️
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg mt-2">
              {task.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-1">
              {task.description}
            </p>

            {/* Severity */}
            <p className="text-sm mt-2">
              Severity:{" "}
              <span className="text-orange-500 font-medium">
                {task.severity || "Medium"}
              </span>
            </p>

            {/* Subtasks */}
            <p className="text-sm">
              Subtasks: {task.subtasks?.length || 0}
            </p>

            {/* Divider */}
            <div className="border-t my-3"></div>

            {/* Bottom Row */}
            <div className="flex justify-between text-sm">
              <span>
                Assigned to: {task.assignee || "User"}
              </span>

              <span className="text-red-500 font-medium">
                Due: {task.dueDate}
              </span>

              <span>
                Priority:{" "}
                <span className="text-red-500">
                  {task.priority || "High"}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}