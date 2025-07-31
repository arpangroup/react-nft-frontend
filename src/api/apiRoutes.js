import { act } from "react";

export const API_ROUTES = {
  STAKES: "/api/v1/investment-schemas?type=STAKE",
  STAKE_DETAILS: (id) => `/api/v1/investment-schemas/${id}`,
};
