import Login from '@/app/page';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Process user login
export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    const {username} = body.username;
    const {password} = body.password;

    const user = await prisma.users.findUnique({
        where: {
            username: username,
        }
    })

    if (user === null) {
        return Response.json({message: 'User does not exist',status: 0});
    } else {
        const correctPassword = await bcrypt.compare(password,user.password);
        if (correctPassword) {
            return Response.json({message: 'Successful Login!', status: 1});
        } else {
            return Response.json({message: "Incorrect password", status: 0});
        }
    }
}