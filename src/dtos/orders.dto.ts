import {IsNumber, IsString } from 'class-validator';

export class  CreateOrderDto {
  @IsNumber()
  subtotal: number
  @IsNumber()
  vat: number
  @IsNumber()
  total: number
  @IsString()
  token: string
  @IsNumber()
  total_items: number
  @IsString()
  customer_name: string
  @IsString()
  status: string
}
