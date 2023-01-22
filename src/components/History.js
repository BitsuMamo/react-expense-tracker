import { useSelector } from "react-redux"
import Transaction from "./Transaction"

const History = () => {
    const { transactions } = useSelector((store) => store.transaction)

    return (
        <div className="history-list">

            <h3>History</h3>
            <hr />

            {
                transactions.map((transaction) => {
                    return (
                        <Transaction
                            key={transaction.id}
                            transaction={transaction}
                        />
                    )
                })
            }



        </div>
    )
}

export default History
