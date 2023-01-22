import { useSelector } from "react-redux"
import Expense from "./Expense"
import Income from "./Income"

const IncomeExpenseCard = () => {
    const { income, expense } = useSelector((store) => store.transaction);


    return (
        <div className="income-expense-card">
            <Income income={income} />
            <div className="line"></div>
            <Expense expense={expense} />

        </div>
    )
}

export default IncomeExpenseCard 
