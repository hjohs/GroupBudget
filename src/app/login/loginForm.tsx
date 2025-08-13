import Link from "next/link";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    //TODO: password encryption
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginState, setLoginState] = useState("");
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const res = await fetch('/api/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: {username}, password: {password}})
        })
        const data = await res.json();
        setLoginState(data.message);
        
        // Status 1 indicates successful login credentials
        if (data.status === 1) {
            router.push('./home');
        }
    }

    return (
        <div className="flex flex-col justify-center text-center">
            <h2 className="mb-3 text-xl font-bold">Login</h2>
            <h3 className="pb-2">{loginState}</h3>
            <form method='post' onSubmit={handleSubmit} className="flex flex-col w-[20%] justify-center mx-auto border-5 rounded-xl p-5">
                <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Username" className="border-2 rounded-sm pl-2 h-10 mb-2"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" className="border-2 rounded-sm pl-2 h-10 mb-2"/>
                <button type="submit" className="border-2 rounded-sm h-10 hover:bg-slate-200">Login</button>
                <Link href={'./newUser'} className="text-blue-800 text-sm pt-1 text-left">Create Account</Link>
            </form>
        </div>
    )
}