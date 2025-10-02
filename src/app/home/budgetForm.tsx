'use client';

import { useState } from 'react';

export default function BudgetForm() {
    const [budgetName,setBudgetName] = useState("");
    const [budgetAmount,setBudgetAmount] = useState("");

    async function handleSubmit() {
        await fetch("@/app/api/newBudget", {method: 'POST'});
    }
    
    return (
        <div className='border-2 mt-3 p-2'>
            <h1 className='pb-1'>Create a New Budget</h1>
            <form method='post' onSubmit={handleSubmit} className='flex flex-col justify-center'>
                <input value={budgetName} onChange={(e)=> setBudgetName(e.target.value)} name="budgetName" placeholder="Name"/>
                <input type="number" min="1" value={budgetAmount} onChange={(e)=> setBudgetAmount(e.target.value)} name="budgetAmount" placeholder="Amount"/>
                <button type='submit' className="border-2 rounded-sm h-8 w-4/5 mx-auto mt-1 hover:bg-slate-200">Create Budget</button>
            </form>
        </div>
    )
}