'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation';

export default function CategoryForm() {

    const [categoryName,setCategoryName] = useState("");
    const [maxSpend,setMaxSpend] = useState("");
    const [creationState,setCreationState] = useState("");
    const params = useParams();
    const budget_id = params.id;

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (maxSpend.length === 0 || parseInt(maxSpend) <= 0) {
            setCreationState("Max spend must be greater than 0");
        } else {
            const res = await fetch('/api/category',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({categoryName,maxSpend,budget_id})
            })
            const data = await res.json();
            setCreationState(data.message);
            setCategoryName("");
            setMaxSpend("");
        }
    }

    return (
        <div className="flex">
            <h4 className="pb-.5 pt-4">{creationState}</h4>
            <div className='border-2 mt-3 p-2'>
                <h1 className='pb-1 text-center'>Create New Category</h1>
                <form method='post' onSubmit={handleSubmit} className='flex flex-col'>
                    <input value={categoryName} onChange={(e)=> setCategoryName(e.target.value)} name="budgetName" placeholder="Name"/>
                    <input type="number" min="0" value={maxSpend} onChange={(e)=> setMaxSpend(e.target.value)} name="budgetName" placeholder="0"/>
                    <button type='submit' className="border-2 rounded-sm h-8 w-4/5 mx-auto mt-1 hover:bg-slate-200">Create Category</button>
                </form>
            </div>
        </div>
    )
}