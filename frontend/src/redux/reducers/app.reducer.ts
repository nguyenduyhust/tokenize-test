import { createTypeReducer, isError } from '../type-redux';
import * as AppActions from '../actions/app.action';
import { OrderBookData } from '~/types/store/app';

export type State = {
  orderBookData?: OrderBookData;
};

export const initialState: State = {
  orderBookData: undefined,
};

export const getOrderBookDataReducer = AppActions.getOrderBookData.reducer<State>(
  (state, action) => {
    if (isError(action)) {
      return {};
    }

    return {
      orderBookData: action.payload,
    };
  },
);

export const updateOrderBookDataReducer = AppActions.updateOrderBookData.reducer<State>(
  (state, action) => {
    return {
      orderBookData: action.payload,
    };
  },
);

export const reducer = createTypeReducer(
  initialState,
  getOrderBookDataReducer,
  updateOrderBookDataReducer,
);
