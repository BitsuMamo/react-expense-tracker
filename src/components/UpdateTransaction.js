const UpdateTransaction = () => {
    return (
        <div className="container">
            <div className="history-list">

                <h3>Update transaction</h3>
                <hr />


                <form className='add-form' onSubmit={null}>
                    <div className='form-control'>
                        <label>Text</label>
                        <input
                            type='text'
                            placeholder='Enter Text'
                        /* value={text}
                        onChange={(e) => setText(e.target.value)} */

                        />
                    </div>
                    <div className='form-control'>
                        <label>Amount</label>
                        <p>(negative - expense, positive - income)</p>
                        <input
                            type='text'
                            placeholder='Enter Amount'
                        /* value={day}
                        onChange={(e) => setDay(e.target.value)} */

                        />
                    </div>

                    <input
                        type='submit'
                        value='Add Transaction'
                        className='btn btn-block'
                    />
                </form>

            </div>

        </div>
    )
}

export default UpdateTransaction
