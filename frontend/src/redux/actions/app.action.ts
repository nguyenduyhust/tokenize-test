import { createTypeAction, createTypeAsyncAction } from '../type-redux';
import { Store } from '~/redux/configure-store';
import * as ApiServices from '~/services/api.service';

export const getOrderBookData = createTypeAsyncAction<
  undefined,
  ApiServices.GetOrderBookDataReturn,
  Store
>('GET_ORDER_BOOK_DATA', async (params, store) => {
  return ApiServices.getOrderBookData();
});

export const updateOrderBookData = createTypeAction<ApiServices.GetOrderBookDataReturn>(
  'UPDATE_ORDER_BOOK_DATA',
  (args) => args,
);
