import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const secret = process.env.SUPABASE_JWT_SECRET;
const key = new TextEncoder().encode(secret);

// Takes in payload to create and reutrn a signed JWT
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('10 minutes')
        .sign(key);
}

// Decrypts a JWT 
export async function decrypt(input: string) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    })
    return payload;
}

// Set updated session token in useer cookies
export async function updateSession(request: NextRequest, session : string) {
    if (!session) {return;}
    //Create updated JWT for session
    const parsed = await decrypt(session);
    const expires = new Date(Date.now() + 1000 * 60 * 10);
    const newJWT = await encrypt({parsed}); 

    //Set new session in cookies
    const cookieStore = await cookies();
    cookieStore.set('session',session, {expires, httpOnly: true});

    const res = NextResponse.next();
    
    return res;
}

// Returns user session cookie
export async function getSession() {
    const cookieStore = await cookies();
    const session =  cookieStore.get('session')?.value;
    if (!session) {return null};
    return await decrypt(session);
}