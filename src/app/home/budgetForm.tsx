'use client';

import { FormEvent, useState } from 'react';

export default function BudgetForm() {
    const [budgetName,setBudgetName] = useState("");
    const [budgetAmount,setBudgetAmount] = useState("");
    const [creationState,setCreationState] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (budgetName.trim().length === 0) {
            setCreationState("Name field cannot be blank");
        } else {
            const res = await fetch("/api/newBudget", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({budgetName})
                });
            const data = await res.json();
            if (data.status == 0) {
                setCreationState(data.message);
            } else if (data.status == 1) {
                setCreationState(data.message);
            }
        }
    }
    
    return (
        <div>
            <h4 className="pb-.5 pt-4 text-red-600">{creationState}</h4>
            <div className='w-72 border-2 mt-3 p-2'>
                <h1 className='pb-1'>Create a New Budget</h1>
                <form method='post' onSubmit={handleSubmit} className='flex flex-col justify-center'>
                    <input value={budgetName} onChange={(e)=> setBudgetName(e.target.value)} name="budgetName" placeholder="Name" className='pl-2'/>
                    <input type="number" min="1" value={budgetAmount} onChange={(e)=> setBudgetAmount(e.target.value)} name="budgetAmount" placeholder="Amount" className='pl-2'/>
                    <button type='submit' className="border-2 rounded-sm h-8 w-4/5 mx-auto mt-1 hover:bg-slate-200">Create Budget</button>
                </form>
            </div>
        </div>
    )
}