export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const FETCH_TASKS = "FETCH_TASKS";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const addTask = (data) => ({ type: ADD_TASK, payload: data });
export const fetchTasks = () => ({ type: FETCH_TASKS });
export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: id,
});

export const editTask = (task) => ({
    type: EDIT_TASK,
    payload: task,
});
