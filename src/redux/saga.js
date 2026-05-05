import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_TASK, ADD_TASK_SUCCESS, FETCH_TASKS, FETCH_TASKS_SUCCESS } from "./actions";

const mockTasks = [];

const addTaskAPI = (task) => new Promise(res => {
  setTimeout(() => {
    const newTask = { ...task, id: Date.now() };
    mockTasks.push(newTask);
    res(newTask);
  }, 300);
});

const fetchTasksAPI = () => new Promise(res => {
  setTimeout(() => res([...mockTasks]), 300);
});

function* addTaskSaga(action) {
  const data = yield call(addTaskAPI, action.payload);
  yield put({ type: ADD_TASK_SUCCESS, payload: data });
}

function* fetchTasksSaga() {
  const data = yield call(fetchTasksAPI);
  yield put({ type: FETCH_TASKS_SUCCESS, payload: data });
}

export default function* rootSaga() {
  yield takeLatest(ADD_TASK, addTaskSaga);
  yield takeLatest(FETCH_TASKS, fetchTasksSaga);
}
