import AddTransaction from "./components/AddTransaction";
import BalanceView from "./components/BalanceView";
import Header from "./components/Header";
import History from "./components/History";
import IncomeExpenseCard from "./components/IcomeExpenseCard";
import Transaction from "./components/Transaction";
import Loading from "./components/Loading";

import { useState, useEffect } from 'react';


function App() {


    const [transactions, setTransactions] = useState([]);
    const [isPending, setIsPending] = useState(true);


    // Loading the transactions data form the server
    useEffect(() => {
        const getData = async () => {
            const transactionsFromServer = await fetchTransactions();
            setTransactions(transactionsFromServer);
        }
        getData();
    }, [])


    // Fetching all transactions data
    const fetchTransactions = async () => {
        const res = await fetch('http://localhost:5000/transactions')


        const data = await res.json()


        setIsPending(false);


        return data;
    }



    const getIncomeExpense = () => {
        // Filters and adds all expense from transactions
        const expense = transactions.filter((transaction) => {
            return transaction.type === "EXPENSE";
        })
            .reduce((total, transaction) => {
                return total + transaction.amount
            }, 0)

        // Filters and adds all income from transactions
        const income = transactions.filter((transaction) => {
            return transaction.type === "INCOME";
        })
            .reduce((total, transaction) => {
                return total + transaction.amount
            }, 0)

        return { income, expense }

    }


    // Adds Task to the database 
    const addTask = async (transaction) => {
        const res = await fetch(
            'http://localhost:5000/transactions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction),
            }
        )
        const data = await res.json();

        setTransactions([...transactions, data]);
    }

    // Updates Task to the database 
    const updateTask = async (transaction) => {
        await fetch(
            `http://localhost:5000/transactions/${transaction.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction),
            }
        )

        const data = await fetchTransactions();

        setTransactions(data);
    }

    // Deletes Task to the database 
    const deleteTransaction = async (id) => {
        await fetch(`http://localhost:5000/transactions/${id}`, { method: 'DELETE', })

        setTransactions(transactions.filter((transaction) => transaction.id !== id))
    }


    const balance = getIncomeExpense().income - getIncomeExpense().expense;


    return (
        <div className="container">

            <Header />
            {
                isPending ?
                    <Loading /> :
                    <>
                        <BalanceView balance={balance} />
                        <IncomeExpenseCard getIncomeExpense={getIncomeExpense} />
                        <History transactions={transactions} onUpdate={updateTask} onDelete={deleteTransaction} />
                    </>
            }
            <AddTransaction onAdd={addTask} />

        </div>
    );
}

export default App;
