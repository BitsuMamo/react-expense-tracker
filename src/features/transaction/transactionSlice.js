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
    async (thunkAPI) => {
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
    async (data, thunkAPI) => {
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
    async (data, thunkAPI) => {
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
    async (id, thunkAPI) => {
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
        calculateIncome: (state) => {
            const income = state.transactions.filter((transaction) => {
                return transaction.type === "INCOME";
            })
                .reduce((total, transaction) => {
                    return total + transaction.amount
                }, 0)

            state.income = income;
        },
        calculateExpense: (state) => {
            const expense = state.transactions.filter((transaction) => {
                return transaction.type === "EXPENSE";
            })
                .reduce((total, transaction) => {
                    return total + transaction.amount
                }, 0)
            state.expense = expense;
        },
        calculateBalance: (state) => {
            state.balance = state.income - state.expense;
        },

    },
    extraReducers: (builder) => {
        // Getting all Transactions from Server
        builder.addCase(getTransactions.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(getTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.transactions = action.payload;
        })
        builder.addCase(getTransactions.rejected, (state) => {
            state.isLoading = false;
        })

        // Adding a transaction to database
        builder.addCase(addTransaction.pending, (state) => {
        })
        builder.addCase(addTransaction.fulfilled, (state, action) => {
            state.transactions = [...state.transactions, action.payload]
        })
        builder.addCase(addTransaction.rejected, (state) => {
        })

        // Deleting a transaction from database
        builder.addCase(deleteTransaction.pending, (state) => {
        })
        builder.addCase(deleteTransaction.fulfilled, (state, action) => {
            state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
        })
        builder.addCase(deleteTransaction.rejected, (state) => {
        })

        // Updating a transaction from database
        builder.addCase(updateTransaction.pending, (state) => {
        })
        builder.addCase(updateTransaction.fulfilled, (state) => {
        })
        builder.addCase(updateTransaction.rejected, (state) => {
        })
    }


    /* extraReducers: {
        // Getting all Transactions from Server
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

        // Adding a transaction to database
        [addTransaction.pending]: (state) => {
        },
        [addTransaction.fulfilled]: (state, action) => {
            state.transactions = [...state.transactions, action.payload]
        },
        [addTransaction.rejected]: (state) => {
        },

        // Deleting a transaction from database
        [deleteTransaction.pending]: (state) => {
        },
        [deleteTransaction.fulfilled]: (state, action) => {
            state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
        },
        [deleteTransaction.rejected]: (state) => {
        },

        // Updating a transaction from database
        [updateTransaction.pending]: (state) => {
        },
        [updateTransaction.fulfilled]: (state) => {
        },
        [updateTransaction.rejected]: (state) => {
        },
    }
*/
})

export const { calculateIncome, calculateExpense, calculateBalance } = transactionSlice.actions;



export default transactionSlice.reducer;
