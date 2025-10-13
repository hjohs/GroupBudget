import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient()

export default async function POST(request: Request) {
    const body = await request.json();
    
}