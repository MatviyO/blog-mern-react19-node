import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ id: string; name: string }>) {
        },
    },
});

export const { setUser } = postsSlice.actions;
export const postsReducer  = postsSlice.reducer;
