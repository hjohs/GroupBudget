import BudgetForm from "../budgetForm";
import CategoryForm from "../categoryForm";

export default function newBudget() {
    

    return (
        <div className="flex flex-col pt-2 h-screen">
            <h1 className="text-center">New Budget Page</h1>
            <BudgetForm/>
            <CategoryForm/>
        </div>
    )
}