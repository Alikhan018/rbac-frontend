import "./scss/home.css";

import React from "react";
import Card from "../../components/shared/Card/Card";
import { users, groups, roles } from "../../props/cards";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <Card entity={users} />
        <Card entity={groups} />
        <Card entity={roles} />
      </div>
    </>
  );
}
