import { ApiProperty } from "@nestjs/swagger";
import {  IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class SendOrdenToCompanyDto { 
  @ApiProperty()
  @IsEmail()
  @MinLength(4)
  @MaxLength(250)
  @IsNotEmpty()
	Email : string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(250)
  @IsNotEmpty()
	NombreResponsable : string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(250)
  @IsNotEmpty()
	NombreUsuarioAsigna : string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
	Url : string;
}

export class SendCertificateToCompanyDto { 
  @ApiProperty()
  @IsEmail()
  @MinLength(4)
  @MaxLength(250)
  @IsNotEmpty()
	Email : string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(250)
  @IsNotEmpty()
	NombreResponsable : string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(250)
  @IsNotEmpty()
	NombreUsuarioAsigna : string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(250)
  @IsNotEmpty()
	NombrePersona : string;


  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
	Url : string;
}
