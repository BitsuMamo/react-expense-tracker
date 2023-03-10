import { useSelector } from "react-redux"

const BalanceView = () => {
    const { balance } = useSelector((store) => store.transaction);
    return (
        <div className="balance-view">
            <h4>Your Balance</h4>
            <h1>{`$ ${balance}`}</h1>
        </div>
    )
}

export default BalanceView
