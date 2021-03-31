import React from 'react';
import { ITransaction } from '../contracts/Transaction.interface';
import { currencyFormatter } from '../utils/currencyFormatter';
import { dateFormatter } from '../utils/dateFormatter';

interface TableProps {
    transactions: ITransaction[];
    totalAmount: number;
}

export const Table: React.FC<TableProps> = ({ transactions, totalAmount }) => {
    const tableColumns = ['date', 'company', 'account', 'amount'];

    return (
        <div className="transaction-table">
            <div className="table-header">
                {tableColumns.map((column) => {
                    if (column === 'amount') {
                        const formattedAmount = currencyFormatter(totalAmount);
                        return (
                            <div className={`col-${column}`}>
                                {formattedAmount}
                            </div>
                        );
                    }
                    return <div className={`col-${column}`}>{column}</div>;
                })}
            </div>
            <div className="table-body">
                {transactions.map((transaction) => {
                    const amount = Number(transaction.Amount);
                    const formattedAmount = currencyFormatter(amount);

                    const formattedDate = dateFormatter(transaction.Date);

                    return (
                        <div
                            className={`table-row ${
                                amount > 0 ? 'income' : ''
                            }`}
                        >
                            <div className="col-date">{formattedDate}</div>
                            <div className="col-company">
                                {transaction.Company}
                            </div>
                            <div className="col-account">
                                {transaction.Ledger}
                            </div>
                            <div className="col-amount">{formattedAmount}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
