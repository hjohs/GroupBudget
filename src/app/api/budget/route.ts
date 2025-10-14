import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const budget_id = searchParams.get("id");

    if (!budget_id) {
        return Response.json({status: 0, message: "No budget id found"});
    }

    const budget = await prisma.budgets.findUnique({
        where: {
            budget_id: BigInt(budget_id)
        }
    })

    
    if (budget) {
        const jsonBudget = {
            budget_id: (budget.budget_id).toString(),
            created_at: budget.created_at,
            owner_id: (budget.owner_id).toString(),
            name: budget.name
        }
        return Response.json({status: 1, budget: jsonBudget, message: "Budget found"})
    } else {
        return Response.json({status: 0, message: "No budget found"})
    }
}