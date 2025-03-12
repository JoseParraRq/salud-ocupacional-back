import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

// Define un DTO para el objeto `inclusion`
export class InclusionDto {
  @ApiProperty()
  @IsBoolean()
  cardiovascular: boolean;

  @ApiProperty()
  @IsBoolean()
  respiratorio: boolean;

  @ApiProperty()
  @IsBoolean()
  ergonomico: boolean;

  @ApiProperty()
  @IsBoolean()
  biologicos: boolean;

  @ApiProperty()
  @IsBoolean()
  dermatologico: boolean;

  @ApiProperty()
  @IsBoolean()
  visual: boolean;

  @ApiProperty()
  @IsBoolean()
  estilosDeVida: boolean;

  @ApiProperty()
  @IsBoolean()
  psicosocial: boolean;

  @ApiProperty()
  @IsString()
  otros: string;
}

export class CreateCertificadoMedicoDTO {

  @ApiProperty({ description: 'ID de la orden' })
  @IsInt()
  orderId: number;

  @ApiProperty({ description: 'ID del aspirante/empleado' })
  @IsInt()
  AspiranteEmpleadoId: number;


  @ApiProperty({ description: 'ID del usuario' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'EPPs' })
  @IsString()
  epps: string;

  @ApiProperty({ description: 'Paraclínicos' })
  @IsString()
  paraClinicos: string;

  @ApiProperty({ description: 'Remisión para paraclínicos' })
  @IsString()
  paraClinicosRemision: string;

  @ApiProperty({ description: 'Reubicación para paraclínicos' })
  @IsString()
  paraClinicosReubicacion: string;

  @ApiProperty({ description: 'Concepto médico' })
  @IsString()
  conceptoMedico: string;

  @ApiProperty({ isArray: true, type: InclusionDto, description: 'Inclusiones' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InclusionDto)
  inclusion: InclusionDto[];

  @ApiProperty({ description: 'Url Pdf' })
  @IsString()
  UrlFile: string;
  
}