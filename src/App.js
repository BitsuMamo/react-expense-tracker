import BalanceView from "./components/BalanceView";
import Header from "./components/Header";
import IncomeExpenseCard from "./components/IcomeExpenseCard";
import History from "./components/History";
import AddTransaction from "./components/AddTransaction";


function App() {
    return (
        <div className="container">
            <Header />
            <BalanceView />
            <IncomeExpenseCard />

            <History />
            <AddTransaction />

        </div>
    );
}

export default App;
