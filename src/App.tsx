import AddTransaction from "./components/AddTransaction";
import BalanceView from "./components/BalanceView";
import Header from "./components/Header";
import History from "./components/History";
import IncomeExpenseCard from "./components/IcomeExpenseCard";
import Loading from "./components/Loading";


import { useEffect } from 'react';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateIncome, calculateExpense, calculateBalance, getTransactions } from './features/transaction/transactionSlice';
import { AppDispatch, RootState } from "./store";


const App: React.FC = () => {

    const { isLoading, transactions } = useSelector((store: RootState) => store.transaction);
    const dispatch: AppDispatch = useDispatch();

    useEffect(
        () => {
            dispatch(getTransactions('Initial State'));
        }, [])

    useEffect(
        () => {
            dispatch(calculateIncome());
            dispatch(calculateExpense());
            dispatch(calculateBalance());
        }, [transactions])


    return (
        <div className="container dark">

            <Header />
            {
                isLoading ?
                    <Loading /> :
                    <>
                        <BalanceView />
                        <IncomeExpenseCard />
                        <History />
                    </>
            }
            <AddTransaction />

        </div>
    );
}

export default App;
