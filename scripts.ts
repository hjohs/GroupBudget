import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.users.create({data: { username: "Bobathon", password: "1234"}})
}

main ().catch( e => {
    console.error(e.message)
}).finally(async () => {
    await prisma.$disconnect()
})