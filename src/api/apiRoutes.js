import { act } from "react";

export const API_ROUTES = {
  STAKES: "/api/v1/investment-schemas?type=STAKE",
  STAKE_DETAILS: (id) => `/api/v1/investment-schemas/${id}`,
  STAKES_BY_USER_ID: (userId) => `/api/v1/investments/user/${userId}`,
  STAKE_SUBSCRIBE: `/api/v1/investments/subscribe`,

  //ELIGIBLE_INVESTMENTS_SUMMARY: (userId) => `/api/v1/investments/eligible-summary?userId=${userId}`,
  INVESTMENTS_API : {
    ELIGIBLE_SUMMARY: (userId) => `/api/v1/investments/eligible-summary?userId=${userId}`,
    RESERVE_NOW: '/api/investments/reserve'
  },

  // Need to be implement....
  DEPOSIT_REQUEST: `/api/v1/deposits/manual`,
  //RESERVED_STAKES: `/api/v1/investment/reserved/${userId}`,
  RESERVED_STAKES: (userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return `/api/v1/investment/reserved/${userId}${queryString ? `?${queryString}` : ''}`;
  },
  USER_STATS: (userId) => `/api/v1/stats/${userId}`,
};

