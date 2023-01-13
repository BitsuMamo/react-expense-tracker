import BalanceView from "./components/BalanceView";
import Header from "./components/Header";
import IncomeExpenseCard from "./components/IcomeExpenseCard";
import History from "./components/History";
import AddTransaction from "./components/AddTransaction";

import { useState, useEffect } from 'react';


function App() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const getData = async () => {
            const transactionsFromServer = await fetchTransactions();

            setTransactions(transactionsFromServer);
        }

        getData();

    }, [])

    const fetchTransactions = async () => {
        const res = await fetch('http://localhost:5000/transactions');

        const data = await res.json();

        return data;
    }

    const getIcomeExpense = () => {
        // const transactionsFromServer = a


        const expense = transactions.filter((transaction) => {
            return transaction.type === "EXPENSE";
        })
            .reduce((total, transaction) => {
                return total + transaction.amount
            }, 0)

        const income = transactions.filter((transaction) => {
            return transaction.type === "INCOME";
        })
            .reduce((total, transaction) => {
                return total + transaction.amount
            }, 0)

        return {income, expense}

    }

    const balance = getIcomeExpense().income - getIcomeExpense().expense;


    return (
        <div className="container">
            <Header />
            <BalanceView balance={balance} />
            <IncomeExpenseCard />

            <History />
            <AddTransaction />

        </div>
    );
}

export default App;
