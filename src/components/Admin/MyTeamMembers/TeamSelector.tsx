import * as React from "react";
import { Header, Dropdown } from "semantic-ui-react";

export const TeamSelector = () => {
  const teamOptions = [
    { text: "View My Booking", value: "teamId_1" },
    { text: "Frictionless Merchandising", value: "teamId_2" },
  ];
  return (
    <>
      <Header as="h3">
        <Header.Content>2. Select Your Team</Header.Content>
      </Header>
      <Dropdown
        placeholder="Select Team.."
        fluid
        selection
        options={teamOptions}
      />
    </>
  );
};
