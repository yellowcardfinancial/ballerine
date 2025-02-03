import { ApiProperty } from '@nestjs/swagger';

export class DocumentTrackerModel {
  @ApiProperty({
    required: true,
    type: String,
  })
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  name!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  status!: string;
}
