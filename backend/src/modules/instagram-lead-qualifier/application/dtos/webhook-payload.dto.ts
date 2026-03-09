import { ApiProperty } from '@nestjs/swagger';

export class InstagramWebhookMessageDto {
  @ApiProperty()
  sender_id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  timestamp: number;
}

export class InstagramWebhookPayloadDto {
  @ApiProperty()
  object: string;

  @ApiProperty({ type: [Object] })
  entry: {
    id: string;
    time: number;
    messaging: {
      sender: { id: string };
      recipient: { id: string };
      timestamp: number;
      message: {
        mid: string;
        text: string;
      };
    }[];
  }[];
}
