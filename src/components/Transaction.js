
import { useState } from "react"
import UpdateTransaction from "./UpdateTransaction";
const Transaction = ({ text, type, amount }) => {
    const [updateTransaction, setUpdateTransaction] = useState(false);
    return (
        <div onClick={() => { setUpdateTransaction(!updateTransaction) }}>
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

            {updateTransaction && <UpdateTransaction />}

        </div>
    )
}

export default Transaction
