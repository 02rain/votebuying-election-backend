import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PRESIDENT25_ID = "election-2025-president"

async function seedElection() {
    const election25 = await prisma.election.upsert({
        where: {id: 'election-25'},
        update: {},
        create: {
            id: 'election-25',
            name: 'election-25',
            startDate: new Date('2025-05-26T00:00:00Z'),
            endDate: new Date('2025-06-26T23:59:59Z'),
            description: 'University Student Council Election 2025',
            isActive: true
            }
        }
    )

    await prisma.position.upsert({
        where: {id: PRESIDENT25_ID},
        update: {},
        create: {
            id: PRESIDENT25_ID,
            title: "president",
            Election: {
                connect: {
                    id: election25.id
                }
            }
        }
        }
    )
}

function generateStudentId(): string {
  const num = Math.floor(Math.random() * 1_000_000).toString().padStart(6, "0")
return `AdDU${num}`
}

async function seedStudents() {
const rawStudents = [
    {
    email: "atbacus2@addu.edu.ph",
    name: "Ainel Bacus",
    department: "Computer Science",
    },
    {
    email: "hydnakagawa@addu.edu.ph",
    name: "Honeydei Yssabelle Nakagawa",
    department: "Information Technology",
    },
    {
    email: "aalboncato@addu.edu.ph",
    name: "Alvin Angelo Boncato",
    department: "Engineering",
    },
]

for (const s of rawStudents) {
    await prisma.student.upsert({
    where: { studentId: `dummy-${s.email}` },
    update: {},
    create: {
        ...s,
        studentId: generateStudentId(),
    },
    })
}
}

async function seedCandidates() {
const ainel = await prisma.student.findFirst({
    where: { email: "atbacus2@addu.edu.ph" },
})

const honeydei = await prisma.student.findFirst({
    where: { email: "hydnakagawa@addu.edu.ph" },
})

if (!ainel || !honeydei) {
    console.error("One or more students not found.")
    return
}

const candidates = [
    {
    studentId: ainel.studentId,
    positionId: PRESIDENT25_ID,
    },
    {
    studentId: honeydei.studentId,
    positionId: PRESIDENT25_ID,
    },
]

for (const candidate of candidates) {
    await prisma.candidate.create({
    data: candidate,
    })
}
}


async function main() {
    console.log("SEEDING DATABASE...");

    await seedElection();
    await seedStudents();
    await seedCandidates();

    console.log("FINISH SEEDING");
}

void main()