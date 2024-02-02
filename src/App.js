import AddTransaction from "./components/AddTransaction";
import BalanceView from "./components/BalanceView";
import Header from "./components/Header";
import History from "./components/History";
import IncomeExpenseCard from "./components/IcomeExpenseCard";
import Transaction from "./components/Transaction";
import Loading from "./components/Loading";

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { calculateIncome, calculateExpense, calculateBalance, getTransactions } from './features/transaction/transactionSlice';


function App() {

  // const [transactions, setTransactions] = useState([])
  const { isLoading, transactions } = useSelector((store) => store.transaction);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getTransactions());
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
