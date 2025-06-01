import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import taskReducer from '@/features/tasks/taskSlice';
import categoryReducer from '@/features/categories/categorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
        categories: categoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
