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
      id: "password_two",
      type: "password",
      label: "Re-enter Password",
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
      // selectValues: roles.data,
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
      // selectValues: groups.data,
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
      // selectValues: roles.data,
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
      // selectValues: users.data,
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
      // selectValues: users.data,
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
      // selectValues: groups.data,
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
      // selectValues: roles.data,
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
      // selectValues: groups.data,
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
      // selectValues: roles.data,
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
      // selectValues: users.data,
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
      // selectValues: users.data,
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
      // selectValues: groups.data,
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
const changePassword = [
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
    id: "password_two",
    type: "password",
    label: "Re-enter Password",
    name: "password",
    options: {
      type: "input",
    },
    required: true,
  },
  {
    id: "3",
    type: "submit",
    label: "Change Password",
    name: "",
    options: {
      type: "button",
    },
    required: false,
  },
];

export { loginForm, addForm, updateForm, changePassword };
