import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskTypes, TaskState, NewTaskData } from '@/features/tasks/taskTypes';
import { RootState } from '@/store';
import { authorizedFetch } from '@libs/utils';

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

// AsyncThunks simplificados usando el helper

export const fetchTasksByCategory = createAsyncThunk<TaskTypes[], 'pending' | 'completed', { state: RootState }>(
    'tasks/fetchByCategory',
    async (status, thunkAPI) => {
        return authorizedFetch<TaskTypes[]>(`/api/task/status/${status}`, { method: 'GET' }, thunkAPI);
    }
);

export const markTaskAsCompleted = createAsyncThunk<TaskTypes, string, { state: RootState; rejectValue: string }>(
    'tasks/markCompleted',
    async (taskId, thunkAPI) => {
        return authorizedFetch<TaskTypes>(`/api/task/${taskId}/mark-completed`, { method: 'PATCH' }, thunkAPI);
    }
);

export const deleteTask = createAsyncThunk<string, string, { state: RootState; rejectValue: string }>(
    'tasks/deleteTask',
    async (taskId, thunkAPI) => {
        await authorizedFetch<null>(`/api/task/delete/${taskId}`, { method: 'DELETE' }, thunkAPI);
        return taskId; // Solo se retorna el Id para actualizar el store
    }
);

export const addTask = createAsyncThunk<TaskTypes, NewTaskData, { state: RootState; rejectValue: string }>(
    'tasks/addTask',
    async (taskData, thunkAPI) => {
        return authorizedFetch<TaskTypes>(
            `/api/task/add`,
            {
                method: 'POST',
                body: JSON.stringify(taskData),
                headers: { 'Content-Type': 'application/json' },
            },
            thunkAPI,
        );
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // fetchTasksByCategory
            .addCase(fetchTasksByCategory.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasksByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasksByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // markTaskAsCompleted
            .addCase(markTaskAsCompleted.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markTaskAsCompleted.fulfilled, (state, action: PayloadAction<TaskTypes>) => {
                state.loading = false;
                // Remueve la tarea completada (asumiendo que ya no quieres verla)
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            })
            .addCase(markTaskAsCompleted.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Fallido para marcar como completado.';
            })

            // deleteTask
            .addCase(deleteTask.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Fallido para eliminar tarea.';
            })

            // addTask
            .addCase(addTask.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<TaskTypes>) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Fallido para agregar tarea.';
            });
    },
});

export default taskSlice.reducer;