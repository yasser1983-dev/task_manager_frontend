import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
    id: number;
    name: string;
    color: string;
}

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    categories: [
        { id: 1, name: 'Trabajo', color: 'red' },
        { id: 2, name: 'Estudio', color: 'blue' },
        { id: 3, name: 'Casa', color: 'green' },
        { id: 4, name: 'Familia', color: 'orange' },
        { id: 5, name: 'Diversión', color: 'purple' },
    ],
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
    },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;