import * as React from "react";
import { Button, Container, Header, Icon, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllTeams, Team } from "../../api/teams/readTeam.api";
import { useEffect, useState } from "react";

export const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getAllTeams().then((teams) => {
      setTeams(teams);
    });
  }, []);

  return (
    <Container textAlign="left">
      <Header as="h1">
        <Icon name="user" />
        <Header.Content>Teams</Header.Content>
      </Header>
      <List link>
        {teams.map((team) => {
          return (
            <List.Item as={Link} to={`/teams/${team.code}`} key={team.code}>
              {team.name}
            </List.Item>
          );
        })}
      </List>
      <Button>Add Team</Button>
    </Container>
  );
};
