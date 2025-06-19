import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Student } from '@prisma/client';
import { ReturnedStudentDto } from 'src/users/dto/students.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get('students')
    @ApiOperation({
    summary: 'Get all students',
    description: 'Retrieves a list of all students in the system.'
})
    @ApiResponse({
    status: 200,
    description: 'List of students retrieved successfully.',
    type: [ReturnedStudentDto]
})
@ApiResponse({
    status: 500,
    description: 'There is something wrong with the server.',
})

async findAllStudents(): Promise<Student[]> {
    return await this.userService.findAllStudents();
}

    @Get('students/find')
    async findStudentById( @Query('id') id:Student['studentId'])  {
        return await this.userService.findStudentById({
            id: id
        })
    }

}