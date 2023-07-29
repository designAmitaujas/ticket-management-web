import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "./generated/graphql";

interface AppState {
  isAuth: boolean;
  isAdmin: boolean;
  user: {
    jwt: string;
    username: string;
    email: string;
  };
  custObje: {
    _id: string;
    email: string;
    hash: string;
    isActive: boolean;
    isAdmin: boolean;
    isCompany: boolean;
    isCustomer: boolean;
    isMiddleMan: boolean;
    isSuperAdmin: boolean;
    name: string;
  };
  addAuth: (arg0: {
    jwt: string;
    username: string;
    email: string;
    isAdmin: boolean;
    custObje: User;
  }) => void;
  removeAuth: () => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuth: false,
      isAdmin: false,
      user: {
        email: "",
        jwt: "",
        username: "",
      },
      custObje: {
        _id: "",
        isCompany: false,
        isCustomer: false,
        isMiddleMan: false,
        email: "",
        hash: "",
        isActive: false,
        isAdmin: false,
        isSuperAdmin: false,
        name: "",
      },
      addAuth: (payload) =>
        set(() => ({
          isAuth: true,
          isAdmin: payload.isAdmin,
          user: {
            email: payload.email,
            jwt: payload.jwt,
            username: payload.username,
          },
          custObje: payload.custObje,
        })),
      removeAuth: () =>
        set((state) => ({
          isAuth: false,
          isAdmin: false,
          user: {
            email: "",
            jwt: "",
            username: "",
          },
          custObje: {
            _id: "",
            isCompany: false,
            isCustomer: false,
            isMiddleMan: false,
            email: "",
            hash: "",
            isActive: false,
            isAdmin: false,
            isSuperAdmin: false,
            name: "",
          },
        })),
    }),
    {
      name: "app-state",
      storage: createJSONStorage(() => localStorage),
      version: 0.03,
    }
  )
);

export { useAppStore };
