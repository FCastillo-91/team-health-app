import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <Menu pointing secondary size="huge" style={{marginBottom: "1em"}}>
        <Menu.Item as={Link} to="/" name="home" />
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/teams" name="admin" />
        </Menu.Menu>
      </Menu>
    </div>
  );
};
