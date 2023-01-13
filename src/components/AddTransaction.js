import { useState } from 'react'
const AddTransaction = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');

    const onSubmit = (e) => {
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

        onAdd({
            text,
            ...result
        })

        setText('');
        setAmount('');

    }

    const checkAmount = () => {
        const sign = amount[0];
        const numStr = amount.substring(1);
        console.log(numStr)

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
        <div className="history-list">

            <h3>Add new transaction</h3>
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
                    type='submit'
                    value='Add Transaction'
                    className='btn btn-block'
                />
            </form>

        </div>
    )
}

export default AddTransaction
