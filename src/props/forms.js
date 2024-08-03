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
    id: 3,
    type: "submit",
    label: "Login",
    name: "",
    options: {
      type: "button",
    },
  },
];

export { loginForm };
