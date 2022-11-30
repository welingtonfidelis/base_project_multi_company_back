import isBoolean from "lodash/isBoolean";

export const parseToBoolean = (val: string | boolean) => {
  if (isBoolean(val)) return val;

  return val === "true";
};
