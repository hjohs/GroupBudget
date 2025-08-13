import Login from '@/app/page';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// Process user login
export async function POST(request: Request) {
    const body = await request.json();
    const {username} = body.username;
    const {password} = body.password;

    const user = await prisma.users.findUnique({
        where: {
            username: username,
            password: password
        }
    })

    if (user === null) {
        console.log("THIS SHIT IS NULL AF");
        return Response.json({message: 'Invalid Login'});
    } else {
        console.log("THIS A VALID ASS LOGIN");
        return Response.json({message: 'Successful Login!'});
    }
}