import {cookies, headers} from 'next/headers';
import { decrypt } from '../lib';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default async function BudgetList() {
    let listBudgets: React.ReactNode = null;

    const header = await headers();
    const host = header.get("host");
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) {
        console.log("Invalid session")
    } else {
        type Payload = {
        payload: {
            username: string;
            user_id: string;
        };
        iat: number;
        exp: number;
        };

        const payload = await decrypt(session) as Payload;
        const user: {username: string, user_id: string} = payload.payload;
        const user_id = user.user_id;

        const res = await fetch(`http://${host}/api/budgetMembership?user_id=${user_id}`,{
        method: "GET",
        headers: {"Content-Type": "application/json"}});
        
        const body = await res.json();
        const {budgets} = body.user;

        listBudgets = budgets.map((budget: {
            budget_id: Key | null | undefined; budget: { id: Key | null | undefined; }; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; 
}) =>  
            <li key={budget.budget_id} className="hover:bg-gray-200" > 
                <a href={`/home/budget/${budget.budget_id}`}>
                    <div className="">
                        <h2 className='text-xl border-2 pb-1 pt-1 pl-2 pr-2'>{budget.name}</h2>
                    </div></a></li>);
        

    }

    

    return (
        <div className='border-1 rounded-sm w-6/5 text-center'>
            <ol>
                {listBudgets}
            </ol>
        </div>
    )
}