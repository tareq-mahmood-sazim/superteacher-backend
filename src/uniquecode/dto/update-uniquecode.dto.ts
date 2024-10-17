import { PartialType } from "@nestjs/swagger";

import { uniquecodeDto } from "./uniquecode.dto";

export class UpdateUniquecodeDto extends PartialType(uniquecodeDto) {}
