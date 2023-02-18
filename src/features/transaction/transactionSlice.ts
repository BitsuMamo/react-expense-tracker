import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Transaction from '../../components/Transaction';
import { IInitialState, ITransaction } from '../../types';

const initialState: IInitialState = {
    transactions: [],
    balance: 0,
    income: 0,
    expense: 0,
    isLoading: false,
}

export const getTransactions = createAsyncThunk(
    'transaction/getTransactions',
    async (name: string = "getTransactions", thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:5000/transactions');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something Went Wrong');
        }
    }
);

export const addTransaction = createAsyncThunk(
    'transaction/addTransaction',
    async (data: ITransaction, thunkAPI) => {
        try {
            await axios.post(
                'http://localhost:5000/transactions',
                data
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something Went Wrong');
        }
    }
)

export const updateTransaction = createAsyncThunk(
    'transaction/updateTransaction',
    async (data: ITransaction, thunkAPI) => {
        try {
            await axios.put(
                `http://localhost:5000/transactions/${data.id}`,
                data
            );

            thunkAPI.dispatch(getTransactions());

        } catch (error) {
            return thunkAPI.rejectWithValue('Something Went Wrong');
        }
    }
)

export const deleteTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async (id: number, thunkAPI) => {
        try {
            await axios.delete(
                `http://localhost:5000/transactions/${id}`,
            );
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something Went Wrong');
        }
    }
)

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        calculateIncome: (state: IInitialState): void => {
            const income: number = state.transactions.filter((transaction) => {
                return transaction.type === "INCOME";
            })
                .reduce((total, transaction) => {
                    return total + transaction.amount
                }, 0)

            state.income = income;
        },
        calculateExpense: (state: IInitialState): void => {
            const expense: number = state.transactions.filter((transaction) => {
                return transaction.type === "EXPENSE";
            })
                .reduce((total, transaction) => {
                    return total + transaction.amount
                }, 0)
            state.expense = expense;
        },
        calculateBalance: (state: IInitialState): void => {
            state.balance = state.income - state.expense;
        },

    },
    extraReducers: (builder) => {
        // Getting all Transactions from Server
        builder.addCase(getTransactions.pending, (state: IInitialState) => {
            state.isLoading = true;
        })

        builder.addCase(getTransactions.fulfilled, (state: IInitialState, action: PayloadAction<ITransaction[]>) => {
            state.isLoading = false;
            state.transactions = action.payload;
        })
        builder.addCase(getTransactions.rejected, (state: IInitialState) => {
            state.isLoading = false;
        })

        // Adding a transaction to database
        builder.addCase(addTransaction.pending, (state: IInitialState) => {
        })

        // TODO: USED any 
        builder.addCase(addTransaction.fulfilled, (state: any, action: any) => {
            state.transactions = [...state.transactions, action.payload]
        })

        builder.addCase(addTransaction.rejected, (state) => {
        })

        // Deleting a transaction from database
        builder.addCase(deleteTransaction.pending, (state) => {
        })
        builder.addCase(deleteTransaction.fulfilled, (state: IInitialState, action: PayloadAction<Number | void>) => {
            state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
        })
        builder.addCase(deleteTransaction.rejected, (state: IInitialState) => {
        })

        // Updating a transaction from database
        builder.addCase(updateTransaction.pending, (state: IInitialState) => {
        })
        builder.addCase(updateTransaction.fulfilled, (state: IInitialState) => {
        })
        builder.addCase(updateTransaction.rejected, (state: IInitialState) => {
        })
    }
})

export const { calculateIncome, calculateExpense, calculateBalance } = transactionSlice.actions;



export default transactionSlice.reducer;
