import { ApiProperty } from '@nestjs/swagger';

export class BoardRequest {
  @ApiProperty({
    type: String,
    description: '제목',
    default: '',
  })
  readonly title: string;

  @ApiProperty({
    type: String,
    description: '제목',
    default: '',
  })
  readonly content: string;
}
