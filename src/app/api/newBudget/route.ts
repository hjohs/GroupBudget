import { PrismaClient } from '@prisma/client';

const primsa = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const {budgetName} = body.budgetName;
    const [budgetAmount] = body.budgetAmount;
    //TODO: complete once sessions are setup
    
}