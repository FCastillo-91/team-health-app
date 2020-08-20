import * as React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <Menu pointing secondary size="huge">
        <Menu.Item as={Link} to="/" name="home" />
        <Menu.Item as={Link} to="/features" name="features" />
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/admin" name="admin" />
        </Menu.Menu>
      </Menu>
    </div>
  );
};
