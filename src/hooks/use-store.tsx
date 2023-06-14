import { create } from "zustand";

type AuthDataType = {
  user: any;
  accessToken: string;
};

type StoreState = {
  accessToken: any | null;
  authData: any | null;
  setAccessToken: (accessToken: any) => void;
  setAuthData: (newAuthData: AuthDataType | null) => void;
};

export const useStore = create<StoreState>((set) => ({
  isLoading: true,
  accessToken:
    typeof window !== "undefined" && localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null,

  setAccessToken: (newAccessToken: string) =>
    set((state) => ({ accessToken: newAccessToken })),

  authData:
    typeof window !== "undefined" && localStorage.getItem("authData")
      ? JSON.parse(localStorage.getItem("authData") as string)
      : null,

  setAuthData: (newAuthData: AuthDataType | null) =>
    set((state) => ({ authData: newAuthData })),
}));
