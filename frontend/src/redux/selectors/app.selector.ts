import { RootState } from '../configure-store';
import * as AppActions from '~/redux/actions/app.action';

export const sOrderBookData = (rootState: RootState) => rootState.appState.orderBookData;
export const sIsGetOrderBookDataPending = (rootState: RootState) =>
  AppActions.getOrderBookData.isPending(rootState);
