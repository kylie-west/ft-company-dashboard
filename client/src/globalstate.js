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
  default: [
    {
      id: 1,
      date: new Date(),
      title: "Announcement 1",
      message:
        "Elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc",
      author: "Chris, CEO",
    },
    {
      id: 2,
      date: new Date(),
      title: "Announcement 2",
      message:
        "Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus",
      author: "Chris, CEO",
    },
    {
      id: 3,
      date: new Date(),
      title: "Announcement 3",
      message:
        "Magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris a",
      author: "Chris, CEO",
    },
  ],
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
    isOpen: false,
    type: "", // refer to ModalContainer.js for list of types
  },
});
