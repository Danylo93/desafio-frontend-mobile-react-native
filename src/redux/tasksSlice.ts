import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task} from '../types';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<{id: string; data: Partial<Task>}>,
    ) => {
      const {id, data} = action.payload;
      const index = state.findIndex(task => task.id === id);
      if (index !== -1) {
        state[index] = {...state[index], ...data};
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter(task => task.id !== action.payload);
    },
  },
});

export const {addTask, updateTask, deleteTask} = tasksSlice.actions;

export default tasksSlice.reducer;
