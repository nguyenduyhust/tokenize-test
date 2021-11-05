import Axios from 'axios';
import { paths as ApiPaths } from '~/types/api.type';
import { ApiRouteEnum } from '~/enums/api-route.enum';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// axios.interceptors.request.use((config) => {
//   // Use latest 'accessToken' in auth header when reference is expired
//   const latestAccessToken = SecureStorageUtils.getItem(SecureStorageEnum.ACCESS_TOKEN);
//   const newConfig = { ...config };
//   if (latestAccessToken && latestAccessToken !== accessToken) {
//     newConfig.headers.Authorization = TokenUtils.tokenToBearerSchema(latestAccessToken);
//   }
//   return newConfig;
// });

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return response;
  },
  async (interceptorError) => {
    if (interceptorError?.response?.data) {
      throw interceptorError.response.data;
    }

    throw interceptorError;
  },
);

export type GetOrderBookDataReturn =
  ApiPaths[typeof ApiRouteEnum.GET_ORDER_BOOK_DATA]['get']['responses']['200']['content']['application/json'];
export const getOrderBookData = async () => {
  return axios.get<any, GetOrderBookDataReturn>(ApiRouteEnum.GET_ORDER_BOOK_DATA);
};
