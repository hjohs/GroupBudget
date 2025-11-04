import { headers } from "next/headers";
import CategoryForm from "../../categoryForm";
import CategoryList from "../../categoryList";
import { BudgetChart } from "./budgetChart";

export default async function BudgetPage({params}: {params: { id: string }}) {
    const header = await headers();
    const host = header.get("host");

    const { id } = await params
    const res = await fetch(`http://${host}/api/budget?id=${id}`, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                });
    const {budget,message} = await res.json();
    const { categories } = budget;
    console.log("CATEGORIES: ", categories);

    return (
        <div className="">
            {/*TODO: add progress bar for total of entire budget*/}
            <h1 className="text-2xl pt-3 text-center">{budget.name}</h1>
            <div className="flex">
                <div className="flex flex-col items-center">
                    <CategoryForm></CategoryForm>
                    <br></br>
                    <CategoryList categories={categories} id={id}></CategoryList>
                </div>
                <div className="flex flex-col justify-center ml-12">
                    <BudgetChart categories={categories}></BudgetChart>
                </div>
            </div>
        </div>
    )
}