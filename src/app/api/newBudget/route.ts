import { PrismaClient } from '@prisma/client';
import { getSession } from '@/app/lib';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const {budgetName: name} = body
    const created_at = new Date();
    const session = await getSession();
    const owner_id = BigInt((session?.payload as { user_id: string })?.user_id);

    //Check if user already owns budget with same name
    const uniqueBudget = await prisma.budgets.findFirst({
        where: {
            name: name,
            owner_id: owner_id
        }
    })
    console.log("UNIQUE:", uniqueBudget);
    
    // Returns error message if owned budget with same name is found
    if (uniqueBudget) {
        return Response.json({message: "Already own budget with this name", status: 0});
    }
    
    const newBudget = await prisma.budgets.create({
        data: {
            owner_id,
            created_at,
            name
        }
    })

    return Response.json({message: "Creation successful!", status: 1, budget_id: newBudget.budget_id.toString()}) 
}