import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStudentDto } from 'src/users/dto/students.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * TS Doc/JS Doc
   * @Retrieves all students from the database.
   * @Returns a promise that resolves to an array of student objects.
   *
   */
  async findAllStudents(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }
  /**
   *
   * @retrieves a student by their ID from the database.
   *
   */
  async findStudentById({
    id,
  }: {
    id: Student['studentId'];
  }): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        studentId: id,
      },
    });

    if (!student) {
      // Use a NotFoundException for proper HTTP error handling
      // @see @nest/common
      throw new NotFoundException(`Student not found.`);
    }

    return student;
  }

  async createStudent(data: CreateStudentDto): Promise<Student> {
    // Check if student already exists
    const existing = await this.prisma.student.findUnique({
      where: { studentId: data.studentId },
    });
    if (existing) {
      throw new ConflictException('Student with this ID already exists.');
    }
    return this.prisma.student.create({ data });
  }
}
