import { useState } from "react"
import UpdateTransaction from "./UpdateTransaction";
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

const Transaction = ({ transaction }) => {
    const [updateTransaction, setUpdateTransaction] = useState(false);
    const { id, text, type, amount } = transaction;

    return (
        <div>

            <div
                className={
                    `transaction-card ${type === 'INCOME' ? 'income' : 'expense'}`
                }
            >

                <p>{text}</p>

                <div className="transaction-card-icon">
                    <p>
                        {
                            type === 'INCOME' ?
                                `+ ${amount}` :
                                `- ${amount}`
                        }
                    </p>

                    {
                        updateTransaction ?
                            <FaArrowUp
                                onClick={
                                    () => setUpdateTransaction(!updateTransaction)
                                }
                                className="update-icon"
                            /> :
                            <FaArrowDown
                                onClick={
                                    () => setUpdateTransaction(!updateTransaction)
                                }
                                className="update-icon"
                            />

                    }
                </div>
            </div>

            {
                updateTransaction &&
                <UpdateTransaction
                    transaction={transaction}
                    setUpdateTransaction={setUpdateTransaction}
                />
            }


        </div>
    )
}

export default Transaction
