import BudgetList from "./budgetList"

export default function Home() {
    return (
        <div className="text-center pt-3 pb-3">
            <h1 className="text-2xl">Your Budgets</h1>
            <br></br>
            <BudgetList></BudgetList>
        </div>
    )
}