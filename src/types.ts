export type ITransaction = {
    id: number,
    text: string,
    type: string,
    amount: number
}

export type IInitialState = {
    transactions: ITransaction[],
    balance: number,
    income: number,
    expense: number,
    isLoading: boolean
}