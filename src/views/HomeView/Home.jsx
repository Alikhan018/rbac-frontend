import "./scss/home.css";

import React from "react";
import Card from "../../components/shared/Card/Card";
import { users, groups, roles } from "../../props/card";

export default function Home() {
  return (
    <>
      <div className="container">
        <Card entity={users} />
        <Card entity={groups} />
        <Card entity={roles} />
      </div>
    </>
  );
}
