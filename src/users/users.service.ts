import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
constructor(private readonly prisma: PrismaService) {}

async findAllStudents(): Promise<Student[]> {
    return this.prisma.student.findMany();
    
}

/**
 * Retrieves a student by their ID.
 *
 * @returns
 */


async findStudentById({ id }: {id: Student['studentId']}) : Promise<Student> {
    const student = await this.prisma.student.findUnique({
        where: {
            studentId: id
        },
    })

    if (!student){
        // Use notFoundException for proper HTTP handling
        // @see @nest/common
        throw new NotFoundException(`Student with ID ${id} not found`);
    }
    
    return student;
}}