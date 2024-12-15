/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {PrismaClient} from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    try {
        const password = bcrypt.hashSync("admin123", 10);

        const userSeed = await prisma.user.create({
            data: {
                email: "admin@gmail.com",
                name: "Test Admin",
                role: "ADMIN",
                password,
            },
        });

        console.log("User seed created successfully:", userSeed);
    } catch (error) {
        console.error("Error seeding user:", error.message);
    } finally {
        await prisma.$disconnect(); // Ensure Prisma disconnects from the database
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
