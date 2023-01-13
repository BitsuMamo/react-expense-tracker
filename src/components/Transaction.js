import { useState } from "react"
import UpdateTransaction from "./UpdateTransaction";
import { FaArrowDown, FaArrowUp} from "react-icons/fa"

const Transaction = ({ id, text, type, amount, onUpdate }) => {
    const [updateTransaction, setUpdateTransaction] = useState(false);
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
                    oldText={text}
                    type={type}
                    oldAmount={amount}
                    onUpdate={onUpdate}
                    setUpdateTransaction={setUpdateTransaction}
                    id={id}
                />
            }


        </div>
    )
}

export default Transaction
