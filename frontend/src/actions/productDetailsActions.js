import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
} from '../constants/productDetailsConstants.js';

import axios from 'axios';

export const productDetails = (id) => async (dispactch) => {
  try {
    dispactch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios(`/api/products/${id}`);

    dispactch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispactch({
      type: PRODUCT_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
