import { ApiProperty } from '@nestjs/swagger';

export class OrderBookBidDTO {
  @ApiProperty()
  price: number;

  @ApiProperty()
  size: number;
}

export class OrderBookAskDTO {
  @ApiProperty()
  price: number;

  @ApiProperty()
  size: number;
}

export class OrderBookDTO {
  @ApiProperty({ type: OrderBookBidDTO, isArray: true })
  bids: Array<OrderBookBidDTO>;

  @ApiProperty({ type: OrderBookAskDTO, isArray: true })
  asks: Array<OrderBookAskDTO>;
}
