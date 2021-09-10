import {IsString, IsNumber } from 'class-validator';

export class  CreateItemDto {
  @IsString()
  public name: string;

  @IsNumber()
  public price: number;
}
