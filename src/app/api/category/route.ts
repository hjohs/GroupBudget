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
                current_spend: 0
            }
        })
        return Response.json({status: 1, message: "Category creation successful", category: {name: newCategory.name, max_spend: newCategory.max_spend.toString(), budget_id: newCategory.budget_id.toString()}});
    }
}

// Updates current spend of specific category
export async function PUT(request: Request) {
        const body = await request.json();
        const {category_id,amount} = body;

        const category = await prisma.categories.findUnique({
            where: {
                category_id: category_id
            }
        })
        if (!category) {
            return Response.json({status: 0, message: "Category not found"});
        } else if (!category.current_spend) {
            category.current_spend = 0;
        }

        const updatedCategory = await prisma.categories.update({
            where: {
                category_id: BigInt(category_id)
            },
            data: {
                current_spend: category.current_spend + parseInt(amount)
            }
        })

        if (updatedCategory) {
            return Response.json({status: 1, message: "Current spend updated successfully"});
        } else {
            return Response.json({status: 0, message: 'Failed to update current spend'});
        }

}