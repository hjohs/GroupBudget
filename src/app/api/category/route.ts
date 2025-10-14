import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const {categoryName,maxSpend,budget_id} = body;

    if (parseInt(maxSpend) <= 0) {
        return Response.json({status: 0, message: "Max spend must be greater than 0"});
    }

    const category = await prisma.categories.findFirst({
        where: {
            budget_id: BigInt(budget_id),
            name: categoryName
        }
    });

    if (category) {
        return Response.json({status: 0, message: "Category already exists"});
    } else {
        const newCategory = await prisma.categories.create({
            data: {
                name: categoryName,
                max_spend: parseInt(maxSpend),
                budget_id: BigInt(budget_id),
            }
        })
        return Response.json({status: 1, message: "Category creation successful", category: {name: newCategory.name, max_spend: newCategory.max_spend.toString(), budget_id: newCategory.budget_id.toString()}});
    }
}