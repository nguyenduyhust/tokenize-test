import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderBookDTO } from './app.dto';
import { AppService } from './app.service';

@ApiTags('api')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-order-book')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderBookDTO,
  })
  getOrderBook(): OrderBookDTO {
    return this.appService.getOrderBook();
  }
}
