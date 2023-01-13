import Transaction from "./Transaction"

const History = ({ transactions, onUpdate }) => {

    return (
        <div className="history-list">

            <h3>History</h3>
            <hr />

            {
                transactions.map((transaction) => {
                    return (
                        <Transaction
                            key={transaction.id}
                            text={transaction.text}
                            amount={transaction.amount}
                            type={transaction.type}
                            onUpdate={onUpdate}
                            id={transaction.id}
                        />
                    )
                })
            }



        </div>
    )
}

export default History
