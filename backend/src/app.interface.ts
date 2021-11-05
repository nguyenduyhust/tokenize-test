export interface OrderBookData {
  bids: Array<{ size: number; price: number }>;
  asks: Array<{ size: number; price: number }>;
}
