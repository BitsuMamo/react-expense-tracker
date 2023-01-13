
const Expense = ({ expense }) => {
    return (
        <div className="income-expense">
            <p>EXPENSE</p>
            <p style={{ color: '#b83228' }}>
                {`$ ${expense}`}
            </p>
        </div>
    )
}

export default Expense
