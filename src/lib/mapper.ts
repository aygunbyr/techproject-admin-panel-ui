import { plainToInstance } from 'class-transformer';

export class Mapper {
  static mapFromDto<T, V>(targetClass: new() => T, dto: V): T {
    return plainToInstance(targetClass, dto);
  }

  static mapArrayFromDto<T, V>(targetClass: new () => T, dtos: V[]): T[] {
    return plainToInstance(targetClass, dtos);
  }
}