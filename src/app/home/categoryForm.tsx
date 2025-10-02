'use client'

import { useState } from 'react'

export default function CategoryForm() {

    const [categoryName,setCategoryName] = useState("");
    const [maxSpend,setMaxSpend] = useState("");

    function handleSubmit() {

    }

    return (
        <div className='border-2 mt-3 p-2'>
            <h1 className='pb-1'>Create New Category</h1>
            <form method='post' onSubmit={handleSubmit} className='flex flex-col justify-center'>
                <input value={categoryName} onChange={(e)=> setCategoryName(e.target.value)} name="budgetName" placeholder="Name"/>
                <input type="number" min="0" value={maxSpend} onChange={(e)=> setMaxSpend(e.target.value)} name="budgetName" placeholder="0"/>
                <button type='submit' className="border-2 rounded-sm h-8 w-4/5 mx-auto mt-1 hover:bg-slate-200">Create Budget</button>
            </form>
        </div>
    )
}