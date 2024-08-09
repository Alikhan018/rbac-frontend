import RolesServices from "../services/roles.services";
import UserServices from "../services/users.services";
import GroupServices from "../services/groups.services";

const rs = new RolesServices();
const us = new UserServices();
const gs = new GroupServices();

const users = await us.getAllUsers();
const roles = await rs.getAllRoles();
const groups = await gs.getAllGroups();

const loginForm = [
  {
    id: "email",
    type: "text",
    label: "Enter Email",
    name: "email",
    options: {
      type: "input",
    },
    required: true,
  },
  {
    id: "password",
    type: "password",
    label: "Enter Password",
    name: "password",
    options: {
      type: "input",
    },
    required: true,
  },
  {
    id: "3",
    type: "submit",
    label: "Login",
    name: "",
    options: {
      type: "button",
    },
    required: false,
  },
];

const addForm = {
  user: [
    {
      id: "email",
      type: "text",
      label: "Enter Email",
      name: "email",
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "password",
      type: "password",
      label: "Enter Password",
      name: "password",
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "roles",
      type: "inputWithBtn",
      label: "Select Roles",
      name: "roles",
      selectValues: roles.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "groups",
      type: "inputWithBtn",
      label: "Select Groups",
      name: "groups",
      selectValues: groups.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "3",
      type: "submit",
      label: "Create new User",
      name: "",
      options: {
        type: "button",
      },
    },
  ],
  group: [
    {
      id: "name",
      type: "text",
      label: "Enter Group Name",
      name: "name",
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "roles",
      type: "inputWithBtn",
      label: "Select Roles",
      name: "roles",
      selectValues: roles.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "users",
      type: "inputWithBtn",
      label: "Select Users",
      name: "users",
      selectValues: users.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "3",
      type: "submit",
      label: "Create new Group",
      name: "",
      options: {
        type: "button",
      },
    },
  ],
  role: [
    {
      id: "name",
      type: "text",
      label: "Enter Role Name",
      name: "name",
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "users",
      type: "inputWithBtn",
      label: "Select Users",
      name: "users",
      selectValues: users.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "groups",
      type: "inputWithBtn",
      label: "Select Groups",
      name: "groups",
      selectValues: groups.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "3",
      type: "submit",
      label: "Create new Role",
      name: "",
      options: {
        type: "button",
      },
    },
  ],
};

const updateForm = {
  user: [
    {
      id: "email",
      type: "text",
      label: "Enter Email",
      name: "email",
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "password",
      type: "password",
      label: "Enter Password",
      name: "password",
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "roles",
      type: "inputWithBtn",
      label: "Select Roles",
      name: "roles",
      selectValues: roles.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "groups",
      type: "inputWithBtn",
      label: "Select Groups",
      name: "groups",
      selectValues: groups.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "3",
      type: "submit",
      label: "Update!",
      name: "",
      options: {
        type: "button",
      },
    },
  ],
  group: [
    {
      id: "name",
      type: "text",
      label: "Enter Group Name",
      name: "name",
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "roles",
      type: "inputWithBtn",
      label: "Select Roles",
      name: "roles",
      selectValues: roles.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "users",
      type: "inputWithBtn",
      label: "Select Users",
      name: "users",
      selectValues: users.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "3",
      type: "submit",
      label: "Update!",
      name: "",
      options: {
        type: "button",
      },
    },
  ],
  role: [
    {
      id: "name",
      type: "text",
      label: "Enter Role Name",
      name: "name",
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "users",
      type: "inputWithBtn",
      label: "Select Users",
      name: "users",
      selectValues: users.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "groups",
      type: "inputWithBtn",
      label: "Select Groups",
      name: "groups",
      selectValues: groups.data,
      options: {
        type: "input",
      },
      required: true,
    },
    {
      id: "3",
      type: "submit",
      label: "Update!",
      name: "",
      options: {
        type: "button",
      },
    },
  ],
};
export { loginForm, addForm, updateForm };
