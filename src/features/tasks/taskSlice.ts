import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {TaskTypes, TaskState} from "@/features/tasks/taskTypes";
import {RootState} from "@/store";
import { getTokenFromLocalStorage } from '@libs/utils';
const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};
export const fetchTasksByCategory = createAsyncThunk<
    TaskTypes[],
    'pending' | 'completed',
    { state: RootState }
>(
    'tasks/fetchByCategory',
    async (status, thunkAPI) => {
        const state = thunkAPI.getState();
        const reduxToken = state.auth.token;
        const localToken = getTokenFromLocalStorage();
        const token = reduxToken || localToken;

        if (!token) {
            return thunkAPI.rejectWithValue('No token encontrado.');
        }

        try {
            const res = await fetch(`/api/task/status/${status}`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            return data as TaskTypes[];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Error al obtener tareas');
        }
    }
);

// --- New Async Thunk for Marking Task as Completed ---
export const markTaskAsCompleted = createAsyncThunk<
    TaskTypes,
    string,
    { state: RootState; rejectValue: string }
>(
    'tasks/markCompleted',
    async (taskId: string, thunkAPI) => {
        const state = thunkAPI.getState();
        const reduxToken = state.auth.token;
        const localToken = getTokenFromLocalStorage();
        const token = reduxToken || localToken;

        if (!token) {
            return thunkAPI.rejectWithValue('No token encontrado.');
        }

        try {
            const res = await fetch(`/api/task/${taskId}/mark-completed`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || errorData.message || `Error ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            return data as TaskTypes;
        } catch (error: any) {
            console.error('Error marking task as completed:', error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to mark task as completed.');
        }
    }
);



const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskTypes>) => {
            state.tasks.push(action.payload);
        },
        addTasks: (state, action: PayloadAction<TaskTypes[]>) => {
            state.tasks = action.payload;
        },
    },
    extraReducers: builder => {
        builder
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

            .addCase(markTaskAsCompleted.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markTaskAsCompleted.fulfilled, (state, action: PayloadAction<TaskTypes>) => {
                state.loading = false;
                const updatedTask = action.payload;

                state.tasks = state.tasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                );
            })
            .addCase(markTaskAsCompleted.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to mark task as completed.';
            });
    },
});

export const { addTask, addTasks } = taskSlice.actions;
export default taskSlice.reducer;