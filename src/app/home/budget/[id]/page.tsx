import { headers } from "next/headers";
import CategoryForm from "../../categoryForm";

export default async function BudgetPage({params}: {params: { id: string }}) {
    const header = await headers();
    const host = header.get("host");

    const { id } = await params
    const res = await fetch(`http://${host}/api/budget?id=${id}`, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                });
    const {budget,message} = await res.json();

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl pt-3">{budget.name}</h1>
            <CategoryForm></CategoryForm>
        </div>
    )
}