import { encrypt,decrypt } from '@/app/lib';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

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
            // Create session for user
            // Expires in 1 hour
            const expires = new Date(Date.now() + 10 * 60 * 1000)
            const payload = {
                username: user.username,
                user_id: user.user_id.toString()
            }
            console.log('Payload:',payload);
            const session = await encrypt({payload});  
            //Set session in cookies
            const cookieStore = await cookies();
            cookieStore.set('session',session, {expires, httpOnly: true});

            return Response.json({message: 'Successful Login!', status: 1});
        } else {
            return Response.json({message: "Incorrect password", status: 0});
        }
    }
}