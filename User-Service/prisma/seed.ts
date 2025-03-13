// import { prismaClient } from "../src/db"
// async function main() {
//     await prismaClient.user.createMany({
//         data: [
//             { firstname: "maneesh", lastname: "Setti" },
//             { name: "Smartphone", price: 500 },
//         ],
//     });
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });