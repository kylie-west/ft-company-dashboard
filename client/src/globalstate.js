import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const appState = atom({
  key: "appState",
  default: {
    viewTeamId: null
  }
});

export const userState = atom({
  key: "userState",
  default: {
    isLoggedIn: true,
    isAdmin: true,
    // TO BE DELETED IN FINAL!!!!!!!
    id: 1,
    profile: {
      firstname: "John",
      lastname: "Smith",
      email: "john.smith@gmail.com",
      phone: "483-3278-3732"
    },
    active: true,
    status: "joined",
    companies: [
      {
        id: 2,
        name: "FastTrack",
        description: "gotta go fast",
        teams: [
          {
            id: 3,
            name: "Awesome",
            description: "Among us",
            users: [{ id: 1 }]
          }
        ],
        users: [
          {
            id: 1,
            profile: {
              firstname: "John",
              lastname: "Smith",
              email: "john.smith@gmail.com",
              phone: "483-3278-3732"
            },
            active: true,
            status: "joined"
          }
        ]
      }
    ],
    teams: [
      {
        id: 3,
        name: "Awesome",
        description: "Among us",
        users: [
          {
            id: 1,
            profile: {
              firstname: "John",
              lastname: "Smith",
              email: "john.smith@gmail.com",
              phone: "483-3278-3732"
            },
            active: true,
            status: "joined"
          }
        ]
      }
    ]
  },
  effects_UNSTABLE: [persistAtom]
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
      author: {
        id: 1,
        profile: {
          firstname: "John",
          lastname: "Smith",
          email: "john.smith@gmail.com",
          phone: "483-3278-3732"
        },
        isAdmin: true,
        active: true,
        status: "joined"
      }
    },
    {
      id: 2,
      date: new Date(),
      title: "Announcement 2",
      message:
        "Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus",
      author: {
        id: 1,
        profile: {
          firstname: "John",
          lastname: "Smith",
          email: "john.smith@gmail.com",
          phone: "483-3278-3732"
        },
        isAdmin: true,
        active: true,
        status: "joined"
      }
    },
    {
      id: 3,
      date: new Date(),
      title: "Announcement 3",
      message:
        "Magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris a",
      author: {
        id: 1,
        profile: {
          firstname: "John",
          lastname: "Smith",
          email: "john.smith@gmail.com",
          phone: "483-3278-3732"
        },
        isAdmin: true,
        active: true,
        status: "joined"
      }
    }
  ]
});

export const companyState = atom({
  key: "companyState",
  default: []
});

export const allUsersState = atom({
  key: "allUsersState",
  default: []
});

export const errorState = atom({
  key: "errorState",
  default: {
    isError: false,
    message: ""
  }
});

export const modalState = atom({
  key: "modalState",
  default: {
    isOpen: false,
    type: "", // refer to ModalContainer.js for list of types
    data: {} // do whatever you want with this
  }
});

// TO BE DELETED?
export const projectsState = atom({
  key: "projectsState",
  default: [
    {
      id: 4,
      name: "Cool Project",
      description:
        "Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus",
      active: true,
      team: {
        id: 10,
        name: "Awesome",
        description: "Among us",
        users: [{ id: 1 }]
      }
    },
    {
      id: 5,
      name: "Lorem Ipsum",
      description:
        "Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus",
      active: false,
      team: {
        id: 20,
        name: "Awesome",
        description: "Among us",
        users: [{ id: 1 }]
      }
    }
  ]
});

export const teamState = atom({
  key: "teamState",
  default: [
    {
      id: 10,
      name: "Team 1",
      description: "C'est l'equipe un",
      teammates: [
        {
          id: 1,
          profile: {
            firstname: "John",
            lastname: "Smith",
            email: "john.smith@gmail.com",
            phone: "483-3278-3732"
          },
          active: true,
          status: "joined"
        },
        {
          id: 2,
          profile: {
            firstname: "Steve",
            lastname: "Rogers",
            email: "john.smith@gmail.com",
            phone: "483-3278-3732"
          },
          active: true,
          status: "joined"
        }
      ]
    },
    {
      id: 20,
      name: "Team 2",
      description: "C'est l'equipe deux",
      teammates: [
        {
          id: 1,
          profile: {
            firstname: "John",
            lastname: "Smith",
            email: "john.smith@gmail.com",
            phone: "483-3278-3732"
          },
          active: true,
          status: "joined"
        },
        {
          id: 2,
          profile: {
            firstname: "Clark",
            lastname: "Kent",
            email: "john.smith@gmail.com",
            phone: "483-3278-3732"
          },
          active: true,
          status: "joined"
        }
      ]
    }
  ]
});
