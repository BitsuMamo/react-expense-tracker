import Transaction from "./Transaction"

const History = () => {
    return (
        <div className="history-list">

            <h3>History</h3>
            <hr />


            <Transaction text={'Cash'} amount={500} type={'INCOME'} />
            <Transaction text={'Book'} amount={40} type={'EXPENSE'} />
            <Transaction text={'Camera'} amount={200} type={'EXPENSE'} />

        </div>
    )
}

export default History
