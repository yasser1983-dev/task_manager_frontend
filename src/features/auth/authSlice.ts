import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {loginUser} from './authService';

const storedUser = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('username') || 'null')
    : null;

const storedToken = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('token') || 'null')
    : null;

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, thunkAPI) => {
        try {
            const data = await loginUser(credentials);
            localStorage.setItem('username', JSON.stringify(credentials.username));
            localStorage.setItem('token', JSON.stringify(data.token.trim()));
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: storedUser,
    token: storedToken,
    loading: false,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token.trim();
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
