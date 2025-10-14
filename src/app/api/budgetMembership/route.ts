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