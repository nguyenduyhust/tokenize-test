import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import {
  MAX_TOTAL_ASKS_SIZE,
  MAX_TOTAL_BIDS_AMOUNT,
  NUMBER_OF_FRACTIONAL_DIGITS,
  UPDATE_ORDER_BOOK_DATA_TIMEOUT,
} from './app.constant';
import { OrderBookDTO } from './app.dto';
import { AppGateway } from './app.gateway';
import { OrderBookData } from './app.interface';

@Injectable()
export class AppService {
  private orderBookData: OrderBookData;

  private generateOrderBookData(): OrderBookData {
    const bids: Array<{ size: number; price: number }> = [];
    const asks: Array<{ size: number; price: number }> = [];

    let totalBidsAmount = 0;
    while (true) {
      const size = this.randomSize();
      const price = this.randomPrice();
      totalBidsAmount =
        totalBidsAmount + this.randomSize() * this.randomPrice();

      if (totalBidsAmount >= MAX_TOTAL_BIDS_AMOUNT) {
        break;
      }

      bids.push({
        size: parseFloat(size.toFixed(NUMBER_OF_FRACTIONAL_DIGITS)),
        price: parseFloat(price.toFixed(NUMBER_OF_FRACTIONAL_DIGITS)),
      });
    }

    let totalAsksSize = 0;
    while (true) {
      const size = this.randomSize();
      const price = this.randomPrice();
      totalAsksSize = totalAsksSize + this.randomSize();

      if (totalAsksSize >= MAX_TOTAL_ASKS_SIZE) {
        break;
      }

      asks.push({
        size: parseFloat(size.toFixed(8)),
        price: parseFloat(price.toFixed(8)),
      });
    }

    return {
      bids: bids.sort((a, b) => b.price - a.price),
      asks: asks.sort((a, b) => a.price - b.price),
    };
  }

  private randomSize() {
    return Math.random() * 10;
  }

  private randomPrice() {
    return Math.random() * (0.04 - 0.03) + 0.03;
  }

  constructor(private readonly appGateway: AppGateway) {
    this.orderBookData = this.generateOrderBookData();
  }

  getOrderBook(): OrderBookDTO {
    return this.orderBookData;
  }

  @Interval(UPDATE_ORDER_BOOK_DATA_TIMEOUT)
  updateOrderBookDataBatch() {
    this.orderBookData = this.generateOrderBookData();
    this.appGateway.broadcastUpdatedOrderBookData(this.orderBookData);
  }
}
