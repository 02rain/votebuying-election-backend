import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Student } from '@prisma/client';

export class ReturnedStudentDto implements Partial<Student> {
  @ApiProperty({
    description: 'Unique identifier for the student',
    example: '123abc',
  })
  studentId: string;

  @ApiProperty({
    description: 'Department of the student',
    example: 'Computer Studies',
  })
  department: string;

  @ApiProperty({
    description: 'Email of the student',
    example: 'kasaneteto@addu.edu.ph',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the student',
    example: 'Kasane Teto',
  })
  name: string;

  @ApiProperty({
    description: 'Role of the student',
    enum: $Enums.Role,
    example: $Enums.Role.STUDENT,
  })
  role: $Enums.Role;
}

export class CreateStudentDto {
  @ApiProperty({
    description: 'Unique identifier for the student',
    example: '123abc',
  })
  studentId: string;

  @ApiProperty({
    description: 'Department of the student',
    example: 'Computer Studies',
  })
  department: string;

  @ApiProperty({
    description: 'Email of the student',
    example: 'kasaneteto@addu.edu.ph',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the student',
    example: 'Kasane Teto',
  })
  name: string;
}
