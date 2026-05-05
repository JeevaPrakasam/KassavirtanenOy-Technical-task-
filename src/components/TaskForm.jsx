import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/actions";

export default function TaskForm({ onClose, editData, setEditData }) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      subtasks: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        subtasks: [{ title: "" }],
      });
    }
  }, [editData, reset]);


  const onSubmit = (data) => {
    if (editData) {
      dispatch(editTask({ ...data, id: editData.id }));
      setEditData(null);
    } else {
      dispatch(addTask(data));
    }

    reset();
    onClose();
  };

  const inputStyle =
    "w-full bg-gray-800 text-white p-2 rounded mt-1 text-sm";

  const labelStyle = "text-sm font-medium text-gray-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Title */}
      <div>
        <label className={labelStyle}>Title *</label>
        <input
          className={`w-full p-2 rounded mt-1 text-sm ${errors.title ? "border border-red-500" : "bg-gray-800 text-white"
            }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Task Type */}
      <div>
        <label className={labelStyle}>Task Type *</label>
        <select className={inputStyle} {...register("taskType")}>
          <option>Bug</option>
          <option>Feature</option>
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className={labelStyle}>Priority *</label>
        <select className={inputStyle} {...register("priority")}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* Project */}
      <div>
        <label className={labelStyle}>Project</label>
        <select className={inputStyle} {...register("project")}>
          <option>E-commerce</option>
          <option>Mobile App</option>
          <option>Food App</option>
        </select>
      </div>

      {/* Assignee */}
      <div>
        <label className={labelStyle}>Assignee</label>
        <select className={inputStyle} {...register("assignee")}>
          <option>John Doe</option>
          <option>Jane Smith</option>
          <option>Bob Johnson</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className={labelStyle}>Description</label>
        <textarea
          className={inputStyle}
          rows="3"
          {...register("description")}
        />
      </div>

      {/* Due Date */}
      <div>
        <label className={labelStyle}>Due Date</label>
        <input type="date" className={inputStyle} {...register("dueDate")} />
      </div>

      {/* Severity */}
      <div>
        <label className={labelStyle}>Severity</label>
        <select className={inputStyle} {...register("severity")}>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      {/* Steps */}
      <div>
        <label className={labelStyle}>Steps to Reproduce</label>
        <textarea
          className={inputStyle}
          rows="3"
          {...register("steps")}
        />
      </div>

      {/* Subtasks */}
      <div>
        <label className={labelStyle}>Subtasks</label>

        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-2 mt-2">
            <input
              className={inputStyle}
              {...register(`subtasks.${index}.title`)}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-black text-white px-3 rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ title: "" })}
          className="mt-2 bg-gray-700 text-white px-3 py-1 rounded"
        >
          Add Subtask
        </button>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}