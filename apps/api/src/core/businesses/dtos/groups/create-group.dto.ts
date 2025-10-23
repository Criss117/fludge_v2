import {
  allPermissions,
  type Permission,
} from '@fludge/entities/permissions.entity';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGroupDto {
  @IsString({
    message: 'El nombre del grupo es obligatorio',
  })
  @MaxLength(100, {
    message: 'El nombre del grupo debe tener un máximo de 255 caracteres',
  })
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsString({
    message: 'La descripción del grupo es obligatoria',
  })
  @MaxLength(255, {
    message: 'La descripción del grupo debe tener un máximo de 255 caracteres',
  })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsArray({
    message: 'Los permisos deben ser un array válido',
  })
  @IsEnum(allPermissions, {
    each: true,
    message: 'Cada permiso debe ser un valor válido',
  })
  permissions: Permission[];
}
