import Expense from "./Expense"
import Income from "./Income"

const IncomeExpenseCard = () => {
    return (
        <div className="income-expense-card">

            <Income />
            <div className="line"></div>
            <Expense />

        </div>
    )
}

export default IncomeExpenseCard 
