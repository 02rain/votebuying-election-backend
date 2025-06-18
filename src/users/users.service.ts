import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
constructor(private readonly prisma: PrismaService) {}

async findAllStudents(): Promise<Student[]> {
    return this.prisma.student.findMany();
    
}
}