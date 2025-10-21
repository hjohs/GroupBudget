'use client'

import { useState, FormEvent } from 'react'
import { useParams } from 'next/navigation';

export default function TransactionForm() {

    const [transactionName,setTransactionName] = useState("");
    const [amount,setAmount] = useState("");
    const [date,setDate] = useState("");
    const [creationState,setCreationState] = useState("");
    const params = useParams();
    const category_id = params.category_id;

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (amount.length === 0 || parseInt(amount) <= 0) {
            setCreationState("Max spend must be greater than 0");
        } else if (date.length === 0) {
            setCreationState("Date cannot be blank");
        } else if (transactionName.length === 0) {
            setCreationState("Name cannot be blank");
        } else {
            const res = await fetch('/api/transactions',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: transactionName,amount,category_id,date})
            })
            const res2 = await fetch('/api/category',{
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({amount,category_id})
            })
            const dat = await res2.json();

            const data = await res.json();
            setCreationState(data.message);
        }
    }

    return (
        <div className="flex pl-4">
            <div className='flex-col'>
                <h4 className="pb-.5 pt-4 text-center">{creationState}</h4>
                <div className='border-2 mt-3 p-2'>
                    <h1 className='pb-1 text-center'>Add a Transaction</h1>
                    <form method='post' onSubmit={handleSubmit} className='flex flex-col w-[250px]'>
                        <input value={transactionName} onChange={(e)=> setTransactionName(e.target.value)} name="transactionName" placeholder="Name"/>
                        <input type="number" min="0" value={amount} onChange={(e)=> setAmount(e.target.value)} name="amount" placeholder="0"/>
                        <input type='date' onChange={(e)=> setDate(e.target.value)}/>
                        <button type='submit' className="border-2 rounded-sm h-8 w-4/5 mx-auto mt-1 hover:bg-slate-200">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}