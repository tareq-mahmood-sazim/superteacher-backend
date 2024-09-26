import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";

import { UniquecodeRepository } from "@/uniquecode/uniquecode.repository";

import { CreateTeacherListDto } from "./dto/create-teacher-list.dto";
import { UpdateTeacherListDto } from "./dto/update-teacher-list.dto";
import { TeacherListRepository } from "./teacher-list.repository";

@Injectable()
export class TeacherListService {
  constructor(
    private readonly em: EntityManager,
    private readonly teacherRepository: TeacherListRepository,
    private readonly uniquecodeRepository: UniquecodeRepository,
  ) {}

  async create(createTeacherListDto: CreateTeacherListDto) {
    try {
      const code_check = await this.uniquecodeRepository.getUniquecode(createTeacherListDto.email);

      if (code_check?.otp === createTeacherListDto.uniqueCode) {
        await this.em.transactional(async () => {
          await this.teacherRepository.create(createTeacherListDto);
          await this.uniquecodeRepository.deleteUniquecode(createTeacherListDto.email);
        });

        return {
          message: "Teacher created and unique code validated",
          data: {
            name: `${createTeacherListDto.firstName} ${createTeacherListDto.lastName}`,
            email: createTeacherListDto.email,
          },
          status: 200,
        };
      } else {
        return {
          message: "Invalid unique code",
          data: {
            name: `${createTeacherListDto.firstName} ${createTeacherListDto.lastName}`,
            email: createTeacherListDto.email,
          },
          status: 400,
        };
      }
    } catch (err: unknown) {
      console.log(err);
      return {
        message: "Profile already exists or an error occurred",
        data: {
          name: `${createTeacherListDto.firstName} ${createTeacherListDto.lastName}`,
          email: createTeacherListDto.email,
        },
        status: 400,
      };
    }
  }

  findAll() {
    return `This action returns all teacherList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacherList`;
  }

  update(id: number, updateTeacherListDto: UpdateTeacherListDto) {
    return {
      message: "Profile updated successfully",
      data: updateTeacherListDto,
      status: 200,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} teacherList`;
  }
}
