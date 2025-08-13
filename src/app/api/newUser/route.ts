import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// Process user creation submission
export async function POST(request: Request) {
    const body = await request.json();
    const {username} = body.username;
    const {password} = body.password;
    //TODO: Add password validation
    //TODO: Navigate to home on success
    //TODO: Failure and success messages
    
    const uniqueUsername = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    
    // Checks if either field is empty
    if (username.length === 0 || password.length === 0) {
        return Response.json({message:'Fields can not be empty', status: 0});
    }

    // Checks if username already exists
    if (uniqueUsername) {
        return Response.json({message:'Username already exists', status: 0});
    }

    const newUser = await prisma.users.create({
        data: {
            username: username,
            password: password
        }
    })
    console.log('New user created',newUser);

    return Response.json({message: "Registration successful!", status: 1})
    
}