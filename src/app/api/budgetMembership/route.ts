import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create new budget user membership relationship
export async function POST(request: Request) {
    const body = await request.json();
    const {budget_id,user_id} = body;

    const membership =  await prisma.budget_membership.create({
        data: {
            budget_id: BigInt(budget_id),
            user_id: BigInt(user_id)
        }
    })

    return Response.json({status: 1, message: "Membership creation successful"})
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
        return Response.json({status:0, message: "No user id found"});
    }

    const user = await prisma.users.findUnique({
        where: {
            user_id: BigInt(user_id)
        },
        include: {
            budgets: true
        }
    })

    if (!user) {
        console.log("AGENT FAILURE")
        return Response.json({status: 0, messsage: "User not found"});
    } else {
        const jsonUser = {
            budgets: user.budgets.map(budg => ({
                budget_id: budg.budget_id.toString(),
                name: budg.name,
            }))
        };
        console.log("AGENT GOT ME");
        console.log(jsonUser);
        return Response.json({status: 200, message: "Budgets retrieved successfully", user: jsonUser});
    }
}