'use client'

import Link from "next/link";
import { FormEvent,useState } from 'react';

export default function UserCreationForm() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submit Being Handled...");
        const res = await fetch('/api/newUser',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: {username}, password: {password} }),
        });

        return;
    }

    return (
        <div className="flex flex-col justify-center text-center">
            <h2 className="mb-3 text-xl font-bold">Create Account</h2>
            
            <form method="post" onSubmit={handleSubmit} className="flex flex-col w-[20%] justify-center mx-auto border-5 rounded-xl p-5">
                <input value={username} name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="border-2 rounded-sm pl-2 h-10 mb-2"/>
                <input value={password} name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border-2 rounded-sm pl-2 h-10 mb-2"/>
                <button type="submit" className="border-2 rounded-sm h-10 hover:bg-slate-200">Sign Up</button>
                <Link href={'./'} className="text-blue-800 text-sm pt-1 text-left">Already have an account?</Link>
            </form>
        </div>
    )
}