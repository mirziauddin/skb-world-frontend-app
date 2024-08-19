export const BASE_URL = "http://localhost:8080/api/v1";
// export const BASE_URL = "https://anylive/api/v1";

// export const getFromLocalStorage = (key: string) => {
//   return localStorage.getItem(key);
// };

export const removeFromLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

export const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
