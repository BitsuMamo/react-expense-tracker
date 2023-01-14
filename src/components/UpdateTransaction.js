import { useState } from 'react';

const UpdateTransaction = ({ id, onUpdate, oldText, oldAmount, type, setUpdateTransaction, onDelete }) => {
    const [text, setText] = useState(oldText);
    const [amount, setAmount] = useState(
        `${type === 'INCOME' ? '+' : '-'}${oldAmount}`
    );

    const btnState = {
        button: 1
    }

    const onSubmit = (e) => {
        if (btnState.button === 1) {
            e.preventDefault()

            if (!text) {
                alert("Please add a text")
                return
            }

            if (!amount) {
                alert("Please add a amount")
                return
            }

            const result = checkAmount();

            if (!result) {
                return
            }

            onUpdate({
                id,
                text,
                ...result
            })
        }

        if (btnState.button === 2) {
            onDelete(id)
        }

        setUpdateTransaction(false);

    }

    const checkAmount = () => {
        const first = amount[0];

        const sign = (first !== '+' && first !== '-') ? '+' : first;

        let numStr;

        if (isNaN(first)) {
            numStr = amount.substring(1);
        } else {
            numStr = amount;
        }


        if (sign !== '+' && sign !== '-') {
            alert("Use proper signs");
            return false
        }

        const type = sign === '+' ? 'INCOME' : 'EXPENSE';

        if (isNaN(numStr)) {
            alert("Please add proper amount");
            return false
        }

        const num = Number(numStr)

        return {
            amount: num,
            type
        }
    }
    return (
        < div className="container" onClick={null}>
            <div className="history-list">

                <h3>Update transaction</h3>
                <hr />


                <form className='add-form' onSubmit={onSubmit}>
                    <div className='form-control'>
                        <label>Text</label>
                        <input
                            type='text'
                            placeholder='Enter Text'
                            value={text}
                            onChange={(e) => setText(e.target.value)}

                        />
                    </div>
                    <div className='form-control'>
                        <label>Amount</label>
                        <p>(negative - expense, positive - income)</p>
                        <input
                            type='text'
                            placeholder='Enter Amount'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}

                        />
                    </div>

                    <input
                        onClick={() => btnState.button = 1}
                        type='submit'
                        value='Update Transaction'
                        className='btn btn-block btn-update'
                    />

                    <input
                        onClick={() => btnState.button = 2}
                        type='submit'
                        value='Delete Transaction'
                        className='btn btn-block btn-delete'
                    />

                </form>

            </div>

        </div >
    )
}

export default UpdateTransaction
