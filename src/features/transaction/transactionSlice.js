import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    transactions: [],
    balance: 0,
    income: 0,
    expense: 0,
    isLoading: false,
}

export const getTransactions = createAsyncThunk(
    'transaction/getTransactions',
    async (name, thunkAPI) => {
        try {
            const res = await axios('http://localhost:5000/transactions');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something Went Wrong');
        }
    }
);

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getTransactions.pending]: (state) => {
            state.isLoading = true;
        },
        [getTransactions.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.transactions = action.payload;
        },
        [getTransactions.rejected]: (state) => {
            state.isLoading = false;
        },
    }

})


export default transactionSlice.reducer;
