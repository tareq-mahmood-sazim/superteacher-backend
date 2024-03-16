import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

export interface ParseEnumArrayOptions {
  optional: boolean;
  separator: string;
}

@Injectable()
export class ParseEnumArrayPipe<T> implements PipeTransform<string, T[] | undefined> {
  constructor(
    private readonly enumType: { [key: string]: T },
    private readonly options: ParseEnumArrayOptions = { optional: false, separator: "," },
  ) {}

  transform(value: string | undefined, _: ArgumentMetadata): T[] | undefined {
    if (this.options.optional && (value === undefined || value === "")) {
      return undefined;
    }

    if (value === undefined) {
      throw new BadRequestException("Validation failed: No value provided");
    }

    const values = value.split(this.options.separator).map((item) => item.trim());

    const enumValues = Object.values(this.enumType);
    const invalidValue = values.find((val) => !enumValues.includes(val as T));
    if (invalidValue !== undefined) {
      throw new BadRequestException(`Invalid enum value: ${invalidValue}`);
    }

    return values as T[];
  }
}
