import { EntityDTO, serialize } from "@mikro-orm/core";

import { TSerializationOptions } from "./abstract-base-serializer.types";

export class AbstractBaseSerializer<E extends object, S = EntityDTO<unknown>> {
  protected serializeOneOptions: TSerializationOptions = {
    skipNull: true,
    forceObject: true,
  };

  protected serializeManyOptions: TSerializationOptions = {
    skipNull: true,
    forceObject: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  serialize(data: E, ...args: unknown[]): S {
    // @ts-expect-error this is a valid call
    return serialize(data, this.serializeOneOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  serializeMany(data: E[], ...args: unknown[]): S[] {
    // @ts-expect-error this is a valid call
    return serialize(data, this.serializeManyOptions);
  }
}
