import React, { useState } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const NavBar = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  const options = [
    { key: 1, text: "Create a team", value: "create" },
    { key: 2, text: "Team Profiles", value: "profiles" },
  ];

  const handleSelect = (selectedItem: string) => {
    setSelectedItem(selectedItem);
    if (selectedItem === "create") {
      history.push("/teams/create");
    } else if (selectedItem === "profiles") {
      history.push("/teams");
    }
  };
  return (
    <div>
      <Menu style={{ marginBottom: "20px" }} size="large" attached="top">
        <Menu.Item position="left" name="take a survey" onClick={handleClick} />
        <Menu.Menu position="right">
          <Dropdown
            item
            simple
            text="Admin"
            direction="right"
            options={options}
            onChange={(e, data) => handleSelect(data.value as string)}
            value={selectedItem}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};
