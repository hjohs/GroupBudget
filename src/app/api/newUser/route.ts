import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// Process user creation submission
export async function POST(request: Request) {
    const body = await request.json();
    const {username} = body.username;
    const {password} = body.password;
    //TODO: Add unique user validation
    //TODO: Add password validation
    //TODO: Navigate to home on success
    //TODO: Failure and success messages
    
    const newUser = await prisma.users.create({
        data: {
            username: username,
            password: password
        }
    })
    console.log('New user created',newUser);

    return Response.json({message: "Eek"})
    
}