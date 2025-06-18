import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Student } from '@prisma/client';

export class ReturnedStudentDto implements Partial<Student> {
  @ApiProperty({
    description: 'Unique identifier for the student',
    example: '12345',
  })
  studentId: string;

  @ApiProperty({ 
    description: 'Department the student belongs to',
    example: 'Computer Science',
  })
  department: string;

  @ApiProperty({ 
    description: 'Student email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Student first name',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'Role of the student',
    enum: $Enums.Role,
    example: $Enums.Role.STUDENT,
  })
  role: $Enums.Role;
}