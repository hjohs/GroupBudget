import { headers } from 'next/headers'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import TransactionForm from '@/app/home/transactionForm';


export default async function Category({params}: {params: { category_id: string }}) {
    const { category_id } = await params;
    const header = await headers();
    const host = header.get("host");

    const res = await fetch(`http://${host}/api/transactions?category_id=${category_id}`,{
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });

    const {status,message,body} = await res.json();
    const {transactions,category} = body;

    const listTransactions = transactions.map((transaction: { transaction_id: Key; name: string, amount: string | number | bigint, date: ReactNode }) => 
    <li key={transaction.transaction_id} className="hover:bg-gray-200">
        <div className='flex flex-col '>
            <h2>{transaction.name}</h2>
            <p>${transaction.amount}   {transaction.date}</p>
        </div>
    </li>);

//TODO: Make progress bar prettier
//TODO: Create home page
//TODO: On budget page create progress tracker for all categories
//TODO: Add abilitiy to edit/delete transactions


    return (
        <div>
            <div className='flex flex-col items-center'>
                <h1 className='text-center text-2xl pt-5'>{category.name}</h1>
                <span>${category.current_spend}/{category.max_spend}</span>
                <progress value={category.current_spend/category.max_spend}/>
            </div>
            <div className='flex'>
                <TransactionForm></TransactionForm>
                <div className='flex flex-col pt-3 items-center'>
                    <ol className='border-2 p-2'>
                        {listTransactions}
                    </ol>
                </div>
            </div>
        </div>
    )
}