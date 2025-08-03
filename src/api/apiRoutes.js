import { act } from "react";

export const API_ROUTES = {
  STAKES: "/api/v1/investment-schemas?type=STAKE",
  STAKE_DETAILS: (id) => `/api/v1/investment-schemas/${id}`,
  STAKES_BY_USER_ID: (userId) => `/api/v1/investments/user/${userId}`,
  STAKE_SUBSCRIBE: `/api/v1/investments/subscribe`,
  DEPOSIT_REQUEST: `/api/v1/deposits/manual`, 
};
