
const Transaction = ({ text, type, amount }) => {
    return (
        <div
            className={
                `transaction-card ${type === 'INCOME' ? 'income' : 'expense'}`
            }
        >
            <p>{text}</p>
            <p>
                {
                    type === 'INCOME' ?
                        `+ ${amount}` :
                        `- ${amount}`
                }
            </p>
        </div>
    )
}

export default Transaction
