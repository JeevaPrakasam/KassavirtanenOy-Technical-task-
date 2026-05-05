import {
  ADD_TASK_SUCCESS,
  FETCH_TASKS_SUCCESS,
  DELETE_TASK,
  EDIT_TASK,
} from "./actions";

const initialState = { tasks: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    default:
      return state;
  }
}