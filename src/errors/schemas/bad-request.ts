import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorSchema {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
