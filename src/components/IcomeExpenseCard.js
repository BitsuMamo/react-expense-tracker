import Expense from "./Expense"
import Income from "./Income"

const IncomeExpenseCard = ({ getIncomeExpense }) => {
    const { income, expense } = getIncomeExpense();

    return (
        <div className="income-expense-card">
            <Income income={income} />
            <div className="line"></div>
            <Expense expense={expense} />

        </div>
    )
}

export default IncomeExpenseCard 
