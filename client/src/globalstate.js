import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: {
    isLoggedIn: true,
    isAdmin: true,
  },
  effects_UNSTABLE: [persistAtom],
});

export const announcementsState = atom({
  key: "announcementsState",
  default: [],
});

export const companyState = atom({
  key: "companyState",
  default: [],
});

export const allUsersState = atom({
  key: "allUsersState",
  default: [],
});

export const errorState = atom({
  key: "errorState",
  default: {
    isError: false,
    message: "",
  },
});

export const modalState = atom({
  key: "modalState",
  default: {
    isOpen: true,
    type: "create-project", // refer to ModalContainer.js for list of types
    data: {}, // do whatever you want with this
  },
});
