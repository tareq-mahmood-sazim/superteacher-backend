import { Injectable } from "@nestjs/common";

import { uniquecodeDto } from "./dto/uniquecode.dto";
import { UpdateUniquecodeDto } from "./dto/update-uniquecode.dto";

@Injectable()
export class UniquecodeService {
  create(uniquecode: uniquecodeDto) {
    return `This action adds a new uniquecode ${uniquecode}`;
  }

  findAll() {
    return `This action returns all uniquecode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uniquecode`;
  }

  update(id: number, updateUniquecodeDto: UpdateUniquecodeDto) {
    return `This action updates a #${id} uniquecode -> ${updateUniquecodeDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} uniquecode`;
  }
}
