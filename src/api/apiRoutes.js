import { act } from "react";

export const API_ROUTES = {

  AUTH_API : {
    ACCESS_TOKEN: `/api/auth/accessToken`,
    REFRESH_TOKEN: '/api/auth/refresh',
    VERIFY_OTP: `/api/auth/verify-otp`,
  },

  STAKES: {
    STAKE_LIST: "/api/v1/investment-schemas?type=STAKE",
    STAKE_DETAILS: (id) => `/api/v1/investment-schemas/${id}`,
    MY_STAKE: `/api/v1/investments`,
    SUBSCRIBE_STAKE: `/api/v1/investments/subscribe`,
  },

  INVESTMENTS_API : {
    ELIGIBLE_SUMMARY: "/api/v1/reservations/eligibility"
  },

  RESERVATION_API : {
    ACTIVE_RESERVATIONS: "/api/v1/reservations",
    RESERVE_NOW: '/api/v1/reservations/reserve',
    SELL_RESERVED_STAKE: (reservationId) => `/api/v1/reservations/${reservationId}/sell`,
    RESERVATION_SUMMARY: "/api/v1/reservations/summary",
  },

  USER_INFO: "/api/v1/users/info",

  NOTIFICATION_API : {
    NOTIFICATIONS: (userId) => `/api/v1/notifications?userId=${userId}`,
    MARK_VIEWED: (id) => `/api/v1/notifications/${id}/view`,
    DELETE: (id) => `/api/v1/notifications/${id}`,
  },

  // Need to be implement....
  DEPOSIT_REQUEST: `/api/v1/deposits/manual`,
  //RESERVED_STAKES: `/api/v1/investment/reserved/${userId}`,
  RESERVED_STAKES: (userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return `/api/v1/investment/reserved/${userId}${queryString ? `?${queryString}` : ''}`;
  },
};

