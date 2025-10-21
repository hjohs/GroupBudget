import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const {amount,name,category_id,date} = body;
    
    const transaction = await prisma.transactions.create({
        data: {
            amount: parseInt(amount),
            name,
            category_id: BigInt(category_id),
            date
        }
    });

    if (transaction) {
        return Response.json({status: 1, message: "Transaction creation successful"});
    } else {
        return Response.json({status:0, message: "Transaction creation failed"});
    }
}

// Query param is a category id, function returns category along with all associated transactions
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category_id = searchParams.get("category_id");

    if (!category_id) {
        return Response.json({status:0, message: "No category id found"});
    }

    // Finds category based on category_id and returns associated transactions
    const category = await prisma.categories.findUnique({
        where: {
            category_id: BigInt(category_id)
        },
        include: {
            transactions: true
        }
    })
    
    if (!category) {
        return Response.json({status:0,message:"Category not found"});
    } else if (!category.transactions) {
        return Response.json({status:0,messsage: "No transactions for category",})
    } else {
        const jsonTransactions = {
            transactions: category.transactions.map(trans => ({
                ...trans,
                transaction_id: trans.transaction_id.toString(),
                category_id: trans.category_id.toString(),
            })),
            // Instead of retrieving this info again, possibly use 
            // cache'ing to bring category info from budget page
            category: {
                name: category.name,
                max_spend: category.max_spend,
                current_spend: category.current_spend
            }
        };
        return Response.json({status:1,message:"Transactions loaded succesfully",body: jsonTransactions});
    }
}