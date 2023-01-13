
const Income = ({income}) => {
    return (
        <div className="income-expense">
            <p>INCOME</p>
            <p style={{ color: '#40bf72' }}>
                {`$ ${income}`}
            </p>
        </div>
    )

}

export default Income
