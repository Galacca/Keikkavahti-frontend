export const devOrProd = (): string => {
  if (import.meta.env.PROD) return "https://backend.henkirikos.com";

  return "http://localhost:8000";
};
